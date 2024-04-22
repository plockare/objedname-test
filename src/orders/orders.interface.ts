export interface Order {
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
  deletedAt?: Date | null;
  // items: Array<OrderItem>
}
