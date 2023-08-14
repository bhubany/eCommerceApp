import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  SHIPMENT_STATUS,
  SHIPMENT_TYPE,
} from 'common/enums';
import {Address} from './user';

export interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface Payment {
  type: PAYMENT_METHOD;
  status: PAYMENT_STATUS;
}

export interface Shipment {
  type: SHIPMENT_TYPE;
  status: SHIPMENT_STATUS;
}

export interface Order {
  id: string;
  userId: string;
  orderStatus: ORDER_STATUS;
  totalBill: number;
  products: OrderProduct[];
  shippingAddress: Address;
  payment: Payment;
  shipment: Shipment;
  placedOn: string;
}
