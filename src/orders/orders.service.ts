import { Injectable } from '@nestjs/common';
import { Order, STATE } from './orders.interface';

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];
  private orderNumber = 0;

  create(): Order {
    const order = {
      orderNumber: `${++this.orderNumber}`.padStart(10, '0'),
      status: STATE.PENDING,
    };
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders.filter((order) => !order.deletedAt);
  }

  delete(orderNumber: string): boolean {
    const order = this.orders.find(
      (order) => order.orderNumber === orderNumber,
    );
    if (!order) {
      return false;
    }
    order.deletedAt = new Date();
    return true;
  }

  update(orderNumber: string, update: Partial<Order>): boolean {
    const order = this.orders.find(
      (order) => order.orderNumber === orderNumber,
    );
    if (!order) {
      return false;
    }
    Object.assign(order, update);
    return true;
  }
}
