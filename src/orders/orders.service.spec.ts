import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { STATE } from './orders.interface';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order', async () => {
    const order = service.create();
    expect(order).toEqual({
      orderNumber: '0000000001',
      status: 'PENDING',
    });
  });

  it('should list orders', async () => {
    const order = service.create();
    expect(service.findAll()).toEqual([order]);
  });

  it('should delete order', async () => {
    const order = service.create();
    service.delete(order.orderNumber);
    expect(service.findAll()).toEqual([]);
  });

  it('should update state', async () => {
    const order = service.create();
    service.update(order.orderNumber, { status: STATE.SHIPPED });
    expect(service.findAll()).toEqual([
      {
        orderNumber: order.orderNumber,
        status: 'SHIPPED',
      },
    ]);
  });
});
