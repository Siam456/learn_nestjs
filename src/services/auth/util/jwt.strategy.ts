/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.signedCookies) {
            const cookies =
              Object.keys(req.signedCookies).length > 0
                ? req.signedCookies
                : null;

            if (cookies) {
              const token = cookies['chat_app'];
              return token;
            }
            return null;
          }
          return null;
        },
      ]),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
