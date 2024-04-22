import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Order } from './orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Array<Order> {
    return this.ordersService.findAll();
  }

  @Post()
  create(): Order {
    return this.ordersService.create();
  }

  @Patch(':orderNumber')
  update(
    @Param('orderNumber') orderNumber: string,
    @Body() order: Pick<Order, 'status'>,
  ) {
    const updated = this.ordersService.update(orderNumber, order);
    if (!updated) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':orderNumber')
  remove(@Param('orderNumber') orderNumber: string) {
    const deleted = this.ordersService.delete(orderNumber);
    if (!deleted) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
