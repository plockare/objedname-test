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
  UseGuards,
} from '@nestjs/common';
import { Order } from './orders.interface';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Array<Order> {
    return this.ordersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(): Order {
    return this.ordersService.create();
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete(':orderNumber')
  remove(@Param('orderNumber') orderNumber: string) {
    const deleted = this.ordersService.delete(orderNumber);
    if (!deleted) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
