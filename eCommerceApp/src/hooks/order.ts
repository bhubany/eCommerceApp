import apiCall, {ApiParams} from 'api';
import {order} from 'api/endpoint';
import {STATUS} from 'common/enums';
import {Order} from 'common/types/order';
import {useCallback, useState} from 'react';
import {FetchApiDataType} from './hooks';

interface TrackOrderResponse extends FetchApiDataType<Order> {
  fetch: (orderId: string) => void;
}

export const useTrackOrder = (): TrackOrderResponse => {
  const [data, setData] = useState<FetchApiDataType<Order>>({
    data: {} as Order,
    status: STATUS.PENDING,
    message: null,
  });

  const fetchData = useCallback((orderId: string) => {
    setData(prev => ({
      ...prev,
      status: STATUS.LOADING,
    }));

    const params: ApiParams = {
      endpoint: order.one,
      query: {id: orderId},
    };

    apiCall<Order>(params)
      .then(resp => {
        setData(prevData => ({
          ...prevData,
          data: resp,
          status: STATUS.SUCCESS,
        }));
      })
      .catch(error => {
        setData(prevData => ({
          ...prevData,
          message: error.message.toString(),
          status: STATUS.FAILED,
        }));
      });
  }, []);

  return {...data, fetch: fetchData};
};
