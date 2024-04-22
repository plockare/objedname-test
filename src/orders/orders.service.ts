import { Injectable } from '@nestjs/common';
import { Order } from './orders.interface';

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];

  create(order: Order): Order {
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
