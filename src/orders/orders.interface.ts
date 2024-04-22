export enum STATE {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface Order {
  orderNumber: string;
  status: STATE;
  deletedAt?: Date | null;
  // items: Array<OrderItem>
}
