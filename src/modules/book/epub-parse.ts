import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as AdmZip from 'adm-zip';
import * as XmlJS from 'xml2js';
import { NGINX_PATH } from '../../utils/const';

/**
 * Unzips a file located at the specified `bookPath` to the specified `unzipPath`.
 *
 * @param {string} bookPath - The path to the file to be unzipped.
 * @param {string} unzipPath - The path where the unzipped files will be extracted to.
 * @return {void} This function does not return anything.
 */
export function unzip(bookPath: string, unzipPath: string) {
  const zip = new AdmZip(bookPath);
  zip.extractAllTo(unzipPath, true);
}

export async function parseRootFile(unzipPath: string) {
  const containerFilePath = path.resolve(unzipPath, 'META-INF/container.xml');
  const containerXml = fs.readFileSync(containerFilePath, 'utf-8');
  const { parseStringPromise } = XmlJS;

  const rootFilePath = await parseStringPromise(containerXml, {
    explicitArray: false,
  });
  return rootFilePath.container.rootfiles.rootfile['$']['full-path'];
}

export async function parseContentOpf(
  unzipPath: string,
  rootFile: string,
  fileName: string,
) {
  //获取content.opf路径
  const contentFilePath = path.resolve(unzipPath, rootFile);
  const contentOpf = fs.readFileSync(contentFilePath, 'utf-8');
  const { parseStringPromise } = XmlJS;
  const contentOpfXml = await parseStringPromise(contentOpf, {
    explicitArray: false,
  });

  const { metadata } = contentOpfXml.package;
  const title = metadata['dc:title']; // 书名
  const creator = metadata['dc:creator']; // 作者
  const language = metadata['dc:language']; // 语种
  const publisher = metadata['dc:publisher']; // 出版社
  const coverMeta = metadata.meta.find((meta) => meta['$'].name === 'cover');
  const manifest = contentOpfXml.package.manifest.item;
  const coverRes = manifest.find((m) => m['$'].id === coverMeta['$'].content);
  const dir = path.dirname(contentFilePath);
  const cover = path.resolve(dir, coverRes['$'].href);
  console.log(`电子书信息:
  书名：${title}
  作者：${creator}
  语种：${language}
  出版社：${publisher}
  封面：${decodeURIComponent(cover)}
  `);
  const rootDir = path.dirname(rootFile);
  const content = await parseContent(dir, 'toc.ncx', rootDir, fileName); // 解析目录

  return {
    title,
    creator,
    language,
    publisher,
    cover,
    content,
    rootFile: rootFile,
  };
}
export async function parseContent(
  contentDir: string,
  contentFilePath: string,
  rootDir: string,
  fileName: string,
) {
  const contentPath = path.resolve(contentDir, contentFilePath);
  const contentXml = fs.readFileSync(contentPath, 'utf-8');
  const { parseStringPromise } = XmlJS;
  const data = await parseStringPromise(contentXml, {
    explicitArray: false,
  });
  const navMap = data.ncx.navMap.navPoint;
  const fileNameWithoutSuffix = fileName.replace('.epub', '');
  const navData: Array<{
    id: string;
    playOrder: number;
    text: string;
    href: string;
  }> = [];
  const len = navMap.length;
  for (let i = 0; i < len; i++) {
    const nav = navMap[i];
    const id = nav['$'].id;
    const playOrder = +nav['$'].playOrder;
    const text = nav.navLabel.text;
    const href = nav.content['$'].src;
    navData.push({
      id,
      playOrder,
      text,
      href: `${fileNameWithoutSuffix}/${rootDir}/${href}`,
    });
  }
  return navData;
}

export function copyCoverImage(data, tmpDir) {
  const { cover } = data;
  if (!cover) {
    return;
  }
  const coverPathname = cover.replace(tmpDir + '/', '');
  const coverDir = path.resolve(NGINX_PATH, 'cover');
  const coverNewPath = path.resolve(coverDir, coverPathname);
  fse.mkdirpSync(coverDir);
  fse.copySync(cover, coverNewPath);
  return coverPathname;
}

export function copyUnzipBook(tmpDir, dirName) {
  const bookDir = path.resolve(NGINX_PATH, 'book', dirName);
  fse.mkdirpSync(bookDir);
  fse.copySync(tmpDir, bookDir);
}
