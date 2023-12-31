import {CART_ACTION, CART_STATUS, STATUS} from 'common/enums';

export interface CartProduct {
  productId: string;
  quantity: number;
}

export interface CartDetails extends Cart {
  status: STATUS;
  message: string;
}

export interface Cart {
  id: string;
  userId: string;
  totalBill: number;
  status: CART_STATUS;
  products: CartProduct[];
}

export interface GetUserCart {
  id: string;
}

export interface AddToCartCart {
  userId: string;
  productId: string;
  quantity: number;
}

export interface RemoveFromCart {
  userId: string;
  productId: string;
}

export interface UpdateProductQuantity {
  userId: string;
  productId: string;
  quantity: number;
  action: CART_ACTION;
}

export interface CartMessageResponse {
  message: string;
}

export interface AddToCartResp extends CartMessageResponse {
  status: STATUS;
}
