/*
 * @Description:
 * @Author: wu_linfeng linfeng.wu@trinasolar.com
 * @Date: 2024-04-18 14:35:46
 * @LastEditors: lostimever 173571145@qq.com
 * @LastEditTime: 2024-04-25 16:44:29
 */
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() params) {
    return {
      data: await this.authService.login(params.username, params.password),
      message: '登录成功',
    };
  }
}
