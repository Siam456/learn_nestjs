/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerDto } from '../customerDto/customer.dto';

import { Customer } from '../interface/customer.interface';
import { CustomerService } from '../service/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly appService: CustomerService) {}

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.appService.getAllCustomers();
  }
  @Get('/:id')
  @UsePipes(new ValidationPipe())
  async getCustomer(@Param() id: string): Promise<Customer[]> {
    return this.appService.getCustomer(id);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async addCustomer(@Body() body: CustomerDto): Promise<Customer> {
    return this.appService.addCustomer(body);
  }
}
