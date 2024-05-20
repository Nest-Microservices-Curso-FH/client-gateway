import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Inject,
  ParseUUIDPipe,
  // Query,
} from '@nestjs/common';

import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    // console.log(createOrderDto);
    // return createOrderDto;
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  async findOne(@Param('id', ) id: string) {
    try {

      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', {id})
      )
      
      return order

    } catch (error) {

      throw new RpcException(error)
      
    }
  }
}
