/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';


const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    dotenv.gonfig();
    const config = new ConfigService();
    config.loadfromDotEnv();
    return config;
  },
};

@Module({
  imports: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
