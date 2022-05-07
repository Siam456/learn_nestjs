import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PetModule } from './pet-module/pet.module';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './user-module/user.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    PetModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
