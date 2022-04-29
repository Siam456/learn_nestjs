/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { Customer } from '../interface/customer.interface';
import { CustomerDto } from '../customerDto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('customer') private readonly customerModel: Model<Customer>,
  ) {}

  //   retrive task
  getHello(): string {
    return 'Hello World!';
  }

  //retrive all customer
  public async getAllCustomers(): Promise<Customer[]> {
    return await this.customerModel.find({});
  }
  //retrive a customer
  public async getCustomer(id: string): Promise<Customer[]> {
    console.log(id);

    return await this.customerModel.findOne({ _id: id });
  }

  public async addCustomer(body: CustomerDto): Promise<Customer> {
    const customer = new this.customerModel(body);
    return await customer.save();
  }
}
