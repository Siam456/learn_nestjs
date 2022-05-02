/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controller/customer.controller';
import { CustomerSchema } from './schema/customer.schema';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'customer', schema: CustomerSchema }]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
