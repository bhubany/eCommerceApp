import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAILED,
  FETCH_ALL_ORDER_REQUEST,
  FETCH_ALL_ORDER_SUCCESS,
  FETCH_ALL_ORDER_FAILED,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAILED,
  FETCH_ONE_ORDER_REQUEST,
  FETCH_ONE_ORDER_SUCCESS,
  FETCH_ONE_ORDER_FAILED,
  UPDATE_ORDER_QUANTITY_REQUEST,
  UPDATE_ORDER_QUANTITY_SUCCESS,
  UPDATE_ORDER_QUANTITY_FAILED,
  UPDATE_ORDER_PAYMENT_REQUEST,
  UPDATE_ORDER_PAYMENT_SUCCESS,
  UPDATE_ORDER_PAYMENT_FAILED,
  UPDATE_ORDER_ADDRESS_REQUEST,
  UPDATE_ORDER_ADDRESS_SUCCESS,
  UPDATE_ORDER_ADDRESS_FAILED,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILED,
  RETURN_REPLACE_ORDER_REQUEST,
  RETURN_REPLACE_ORDER_SUCCESS,
  RETURN_REPLACE_ORDER_FAILED,
  REFUND_UPDATES_REQUEST,
  REFUND_UPDATES_SUCCESS,
  REFUND_UPDATES_FAILED,
  SHIPMENT_UPDATES_REQUEST,
  SHIPMENT_UPDATES_SUCCESS,
  SHIPMENT_UPDATES_FAILED,
  RETURN_UPDATES_REQUEST,
  RETURN_UPDATES_SUCCESS,
  RETURN_UPDATES_FAILED,
  PAYMENT_UPDATES_REQUEST,
  PAYMENT_UPDATES_SUCCESS,
  PAYMENT_UPDATES_FAILED,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILED,
  PLACED_ORDER_DETAILS_REQUEST,
  PLACED_ORDER_DETAILS_SUCCESS,
  PLACED_ORDER_DETAILS_FAILED,
  FETCH_LIMITED_ORDER_REQUEST,
  FETCH_LIMITED_ORDER_SUCCESS,
  FETCH_LIMITED_ORDER_FAILED,
  FETCH_LIMITED_USER_ORDER_REQUEST,
  FETCH_LIMITED_USER_ORDER_SUCCESS,
  FETCH_LIMITED_USER_ORDER_FAILED,
} from "../constants/orderConstants";
import { order } from "../../api/config/api-endpoints";
import { axios_instance } from "../../api/config/config";

export const place_order =
  ({
    userId,
    country,
    province,
    city,
    ward,
    tole,
    houseNo,
    shipmentType,
    paymentType,
    action,
  }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: PLACE_ORDER_REQUEST });
      }
      dispatch({ type: PLACE_ORDER_REQUEST });
      const payload = {
        shippingAddress: {
          country,
          province,
          city,
          ward,
          tole,
          houseNo,
        },
        paymentType,
        shipmentType,
      };
      const response = await axios_instance({
        endpoints: order.place,
        query: { id: userId },
        data: payload,
      });

      console.log(response);

      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: PLACE_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const track_order =
  ({ orderId, track, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: TRACK_ORDER_REQUEST });
      }
      dispatch({ type: TRACK_ORDER_REQUEST });
      switch (track.toLowerCase()) {
        case "order":
          var response = await axios_instance({
            endpoints: order.track,
            query: { id: orderId },
          });
          break;

        case "refund":
          var response = await axios_instance({
            endpoints: order.refund,
            query: { id: orderId },
          });
          break;

        default:
          var response = await axios_instance({
            endpoints: order.track,
            query: { id: orderId },
          });
          break;
      }
      dispatch({
        type: TRACK_ORDER_SUCCESS,
        payload: { ...response.data, track: track },
      });
    } catch (err) {
      dispatch({
        type: TRACK_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const fetch_all_order = () => async (dispatch) => {
  try {
    // if (action === "clean") {
    //   return dispatch({ type: FETCH_ALL_ORDER_REQUEST });
    // }

    dispatch({ type: FETCH_ALL_ORDER_REQUEST });
    const response = await axios_instance({
      endpoints: order.all,
    });

    dispatch({
      type: FETCH_ALL_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_ORDER_FAILED,
      payload: err.response,
    });
  }
};

export const fetch_user_orders =
  ({ userId, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: USER_ORDERS_REQUEST });
      }

      dispatch({ type: USER_ORDERS_REQUEST });
      const response = await axios_instance({
        endpoints: order.user,
        query: { id: userId },
      });

      dispatch({
        type: USER_ORDERS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ORDERS_FAILED,
        payload: err.response,
      });
    }
  };

export const fetch_one_order =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: FETCH_ONE_ORDER_REQUEST });
      }

      dispatch({ type: FETCH_ONE_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.one,
        query: { id: orderId },
      });

      dispatch({
        type: FETCH_ONE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_ONE_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const update_order_quantity =
  ({ orderId, id, quantity, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_QUANTITY_REQUEST });
      }

      const payload = {
        productId: id,
        quantity: quantity,
        action: action,
      };

      dispatch({ type: UPDATE_ORDER_QUANTITY_REQUEST });
      const response = await axios_instance({
        endpoints: order.updateQuantity,
        query: { id: orderId },
        data: payload,
      });

      dispatch({
        type: UPDATE_ORDER_QUANTITY_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_QUANTITY_FAILED,
        payload: err.response,
      });
    }
  };

export const update_order_address =
  ({ orderId, newAddress, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_ADDRESS_REQUEST });
      }

      dispatch({ type: UPDATE_ORDER_ADDRESS_REQUEST });
      const response = await axios_instance({
        endpoints: order.updateAddress,
        query: { id: orderId },
        data: newAddress,
      });

      dispatch({
        type: UPDATE_ORDER_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_ADDRESS_FAILED,
        payload: err.response,
      });
    }
  };

export const updatet_order_payment =
  ({ orderId, paymentType, paymentStatus, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_PAYMENT_REQUEST });
      }

      dispatch({ type: UPDATE_ORDER_PAYMENT_REQUEST });
      const response = await axios_instance({
        endpoints: order.updatePayment,
        query: { id: orderId },
        data: { type: paymentType, status: paymentStatus },
      });

      dispatch({
        type: UPDATE_ORDER_PAYMENT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_PAYMENT_FAILED,
        payload: err.response,
      });
    }
  };

export const cancel_order =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: CANCEL_ORDER_REQUEST });
      }

      dispatch({ type: CANCEL_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.cancel,
        query: { id: orderId },
      });

      dispatch({
        type: CANCEL_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: CANCEL_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const return_replace_order =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      console.log(orderId, action);
      if (action === "clean") {
        return dispatch({ type: RETURN_REPLACE_ORDER_REQUEST });
      }

      dispatch({ type: RETURN_REPLACE_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.returnReplace,
        query: { id: orderId },
        data: { action: action },
      });

      dispatch({
        type: RETURN_REPLACE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: RETURN_REPLACE_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const refund_updates =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      console.log(orderId, action);
      if (action === "clean") {
        return dispatch({ type: REFUND_UPDATES_REQUEST });
      }

      dispatch({ type: REFUND_UPDATES_REQUEST });
      const response = await axios_instance({
        endpoints: order.refund,
        query: { id: orderId },
      });

      dispatch({
        type: REFUND_UPDATES_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: REFUND_UPDATES_FAILED,
        payload: err.response,
      });
    }
  };

export const shipment_updates =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      console.log(orderId, action);
      if (action === "clean") {
        return dispatch({ type: SHIPMENT_UPDATES_REQUEST });
      }

      dispatch({ type: SHIPMENT_UPDATES_REQUEST });
      const response = await axios_instance({
        endpoints: order.shipmentUpdates,
        query: { id: orderId },
      });

      dispatch({
        type: SHIPMENT_UPDATES_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: SHIPMENT_UPDATES_FAILED,
        payload: err.response,
      });
    }
  };

export const return_updates =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      console.log(orderId, action);
      if (action === "clean") {
        return dispatch({ type: RETURN_UPDATES_REQUEST });
      }

      dispatch({ type: RETURN_UPDATES_REQUEST });
      const response = await axios_instance({
        endpoints: order.returnUpdates,
        query: { id: orderId },
      });

      dispatch({
        type: RETURN_UPDATES_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: RETURN_UPDATES_FAILED,
        payload: err.response,
      });
    }
  };

export const payment_updates =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      console.log(orderId, action);
      if (action === "clean") {
        return dispatch({ type: PAYMENT_UPDATES_REQUEST });
      }

      dispatch({ type: PAYMENT_UPDATES_REQUEST });
      const response = await axios_instance({
        endpoints: order.paymentupdates,
        query: { id: orderId },
      });

      dispatch({
        type: PAYMENT_UPDATES_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: PAYMENT_UPDATES_FAILED,
        payload: err.response,
      });
    }
  };

export const update_order_status =
  ({ orderId, status, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
      }

      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
      const response = await axios_instance({
        endpoints: order.updateStatus,
        query: { id: orderId },
        data: { status: status },
      });

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_STATUS_FAILED,
        payload: err.response,
      });
    }
  };

export const placed_order_details =
  ({ order, cart, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: PLACED_ORDER_DETAILS_REQUEST });
      }

      dispatch({ type: PLACED_ORDER_DETAILS_REQUEST });
      // const response = await axios_instance({
      //   endpoints: order.updateStatus,
      //   query: { id: orderId },
      //   data: { status: status },
      // });

      const response = {
        cart: cart,
        address: {
          country: order.country,
          province: order.province,
          district: order.district,
          city: order.city,
          ward: order.ward,
          tole: order.tole,
          houseNo: order.houseNo,
        },
        shipment: {
          type: order.shipmentType,
          status: "Awaiting Verification",
        },
        payment: {
          type: order.paymentType,
          status: "NA",
        },
        message: "Bill generated Sucessfully",
      };

      dispatch({
        type: PLACED_ORDER_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: PLACED_ORDER_DETAILS_FAILED,
        payload: { message: "Error Occurs Try again Later" },
      });
    }
  };

export const fetch_limited_order =
  ({ page, limit, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean")
        return dispatch({ type: FETCH_LIMITED_ORDER_REQUEST });
      dispatch({ type: FETCH_LIMITED_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.limited,
        query: { page, limit },
      });
      dispatch({
        type: FETCH_LIMITED_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_LIMITED_ORDER_SUCCESS,
        payload: err.response,
      });
    }
  };

export const fetch_limited_user_order =
  ({ page, limit, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean")
        return dispatch({ type: FETCH_LIMITED_USER_ORDER_REQUEST });
      dispatch({ type: FETCH_LIMITED_USER_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.userLimited,
        query: { page, limit },
      });
      dispatch({
        type: FETCH_LIMITED_USER_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_LIMITED_USER_ORDER_FAILED,
        payload: err.response,
      });
    }
  };
