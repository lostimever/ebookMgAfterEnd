/*
 * @Description:
 * @Author: lostimever 173571145@qq.com
 * @Date: 2024-04-26 14:07:28
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-26 16:59:50
 */
import * as path from 'path';
import * as os from 'os';
import * as fse from 'fs-extra';
import {
  copyCoverImage,
  copyUnzipBook,
  parseContentOpf,
  parseRootFile,
  unzip,
} from './epub-parse';

const TEMP_PATH = '.vben/tmp-book';

export class EpubBook {
  private bookPath: string;
  private file: Express.Multer.File;
  private fileName: string;
  private size: number;

  constructor(bookPath: string, file: Express.Multer.File) {
    this.bookPath = bookPath;
    this.file = file;
    this.fileName = file.originalname;
    this.size = file.size;
  }

  async parseBook() {
    // 1.生成临时文件
    const homeDir = os.homedir();
    const tmpDir = path.resolve(homeDir, TEMP_PATH);
    const tmpFile = path.resolve(tmpDir, this.fileName);
    await fse.copySync(this.bookPath, tmpFile);
    // 2.epub电子书解压
    const tmpUnzipDirName = this.fileName.replace('.epub', '');
    const tmpUnzipDir = path.resolve(tmpDir, tmpUnzipDirName);
    await fse.mkdirpSync(tmpUnzipDir);
    unzip(this.bookPath, tmpUnzipDir);
    // // 3.epub root file解析
    const rootFile = await parseRootFile(tmpUnzipDir);
    // console.log(rootFile);
    // // 4.epub content opf解析
    const bookData = await parseContentOpf(
      tmpUnzipDir,
      rootFile,
      this.fileName,
    );
    // // 5.拷贝电子书封面图片
    const cover = copyCoverImage(bookData, tmpDir);
    bookData.cover = cover;
    // // 6.拷贝解压后电子书
    copyUnzipBook(tmpUnzipDir, tmpUnzipDirName);
    // // 7.删除临时文件
    fse.removeSync(tmpFile);
    fse.removeSync(tmpUnzipDir);
    return bookData;
  }
}
