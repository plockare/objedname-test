import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { HttpException } from '@nestjs/common';
import { STATE } from './orders.interface';
import { AuthModule } from '../auth/auth.module';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order', async () => {
    const order = controller.create();
    expect(order).toEqual({
      orderNumber: order.orderNumber,
      status: 'PENDING',
    });
  });

  it('should delete order', async () => {
    const order = controller.create();
    controller.remove(order.orderNumber);
  });

  it('should not delete order - not found', async () => {
    try {
      controller.remove('03408394839');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('should update order', async () => {
    const order = controller.create();
    controller.update(order.orderNumber, { status: STATE.SHIPPED });
    expect(order).toEqual({
      orderNumber: order.orderNumber,
      status: 'SHIPPED',
    });
  });

  it('should not update order - not found', async () => {
    try {
      controller.update('03408394839', { status: STATE.SHIPPED });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
