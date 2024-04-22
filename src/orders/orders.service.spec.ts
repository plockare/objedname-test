import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';

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
    const order = service.create({ orderNumber: '1234', status: 'PENDING' });
    expect(order).toEqual({
      orderNumber: '1234',
      status: 'PENDING',
    });
  });

  it('should list orders', async () => {
    service.create({ orderNumber: '1234', status: 'PENDING' });
    expect(service.findAll()).toEqual([
      {
        orderNumber: '1234',
        status: 'PENDING',
      },
    ]);
  });

  it('should delete order', async () => {
    service.create({ orderNumber: '1234', status: 'PENDING' });
    service.delete('1234');
    expect(service.findAll()).toEqual([]);
  });

  it('should update state', async () => {
    service.create({ orderNumber: '1234', status: 'PENDING' });
    service.update('1234', { status: 'SHIPPED' });
    expect(service.findAll()).toEqual([
      {
        orderNumber: '1234',
        status: 'SHIPPED',
      },
    ]);
  });
});
