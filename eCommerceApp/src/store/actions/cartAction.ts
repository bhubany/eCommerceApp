import {createAsyncThunk} from '@reduxjs/toolkit';
import apiCall, {ApiError, ApiParams} from 'api';
import {cart} from 'api/endpoint';
import {
  AddToCartCart,
  CartDetails,
  CartMessageResponse,
  GetUserCart,
  RemoveFromCart,
  UpdateProductQuantity,
} from 'common/types';

export const userCart = createAsyncThunk<CartDetails | ApiError, GetUserCart>(
  'cart/get',
  async (input: GetUserCart) => {
    try {
      const params: ApiParams = {
        endpoint: cart.one,
        query: {
          id: input.id,
        },
      };
      return await apiCall<CartDetails>(params);
    } catch (error: Error | unknown) {
      throw <ApiError>(<unknown>(error as Error).message);
    }
  },
);

export const addToCart = createAsyncThunk<
  CartMessageResponse | ApiError,
  AddToCartCart
>('cart/addTo', async (input: AddToCartCart) => {
  try {
    const params: ApiParams = {
      endpoint: cart.addProduct,
      query: {id: input.userId},
      data: {
        productId: input.productId,
        quantity: input.quantity,
      },
    };
    return await apiCall<CartMessageResponse>(params);
  } catch (error: Error | unknown) {
    throw <ApiError>(<unknown>(error as Error).message);
  }
});

export const removeFromCart = createAsyncThunk<
  CartMessageResponse | ApiError,
  RemoveFromCart
>('cart/removeProduct', async (input: RemoveFromCart) => {
  try {
    const params: ApiParams = {
      endpoint: cart.removeProduct,
      query: {id: input.userId, pid: input.productId},
    };
    return await apiCall<CartMessageResponse>(params);
  } catch (error: Error | unknown) {
    throw <ApiError>(<unknown>(error as Error).message);
  }
});

export const updateCartQuantity = createAsyncThunk<
  CartMessageResponse | ApiError,
  UpdateProductQuantity
>(
  'cart/updateQuantity',
  async ({action, productId, quantity, userId}: UpdateProductQuantity) => {
    try {
      const params: ApiParams = {
        endpoint: cart.updateQuantity,
        query: {id: userId},
        data: {productId, quantity, action},
      };
      return await apiCall<CartMessageResponse>(params);
    } catch (error: Error | unknown) {
      throw <ApiError>(<unknown>(error as Error).message);
    }
  },
);
