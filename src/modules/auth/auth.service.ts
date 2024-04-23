/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-22 14:00:23
 * @LastEditors: wu_linfeng linfeng.wu@trinasolar.com
 * @LastEditTime: 2024-04-22 17:29:08
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    const md5Password = md5(password).toUpperCase();
    if (user.password !== md5Password) {
      throw new UnauthorizedException();
    }

    const payload = {
      username,
      userId: user.id,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
