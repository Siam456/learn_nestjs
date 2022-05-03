import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { User } from './database/entity/user.entity';
import { UserHttpModule } from './user-module/users-http.module';

@Module({
  imports: [DatabaseModule, UserHttpModule],
})
export class AppModule {}
