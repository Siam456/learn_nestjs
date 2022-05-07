import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.services';
import { JwtAuthGuard } from './services/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { Roles } from './services/auth/decorators/roles.decorator';
import { UserRole } from './entity/user.entity';
import { RolesGuard } from './services/auth/guards/roles.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }

  @Roles(UserRole.ghost, UserRole.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  //file upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return 'file';
  }
}
