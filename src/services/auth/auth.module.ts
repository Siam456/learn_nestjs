/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user-module/user.module';
import { AuthService } from './auth.services';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './util/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './util/constants';
import { JwtStrategy } from './util/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
