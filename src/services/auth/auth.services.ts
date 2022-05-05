/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user-module/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    public readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByNameOrEmail(username);

    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        return user;
      } else {
        return null;
      }
    }
    return null;

    return user;
  }

  async login(user: any, res: any): Promise<any> {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    };
    const access_token = this.jwtService.sign(payload);

    res.cookie('chat_app', access_token, {
      httpOnly: true,
      maxAge: 86400000,
      signed: true,
    });
    res.locals.loogedInUser = payload;
    res.status(200).json({
      msg: 'Login Successfully',
      access_token: this.jwtService.sign(payload),
    });
  }
}
