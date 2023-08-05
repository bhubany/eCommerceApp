import apiCall, {ApiParams} from 'api';
import {product} from 'api/endpoint';
import {STATUS} from 'common/enums';
import {
  PaginatedProductInputType,
  PaginatedProductResponseType,
} from 'common/types';
import {useCallback, useEffect, useState} from 'react';
import {FetchApiDataType} from './hooks';

interface PaginatedProductResponse
  extends FetchApiDataType<PaginatedProductResponseType> {
  refetch: (page: number, limit: number) => void;
  hasNext: boolean;
  loadingMore: boolean;
}

export const useFetchLimitedProducts = (
  input: PaginatedProductInputType,
): PaginatedProductResponse => {
  const [data, setData] = useState<
    FetchApiDataType<PaginatedProductResponseType>
  >({
    data: {
      data: [],
    },
    status: STATUS.PENDING,
    message: null,
  });
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchData = useCallback((page: number, limit: number) => {
    setData(prev => ({
      ...prev,
      status: STATUS.LOADING,
    }));

    const params: ApiParams = {
      endpoint: product.limited,
      query: {
        page,
        limit,
      },
    };

    apiCall<PaginatedProductResponseType>(params)
      .then(resp => {
        setData(prevData => ({
          ...prevData,
          data: resp,
          status: STATUS.SUCCESS,
        }));
        setHasNext(resp.next ? true : false);
      })
      .catch(error => {
        setData(prevData => ({
          ...prevData,
          message: error.message.toString(),
          status: STATUS.FAILED,
        }));
      });
  }, []);

  useEffect(() => {
    fetchData(input.page, input.limit);
  }, [fetchData, input.page, input.limit]);

  const fetchNext = (page: number, limit: number) => {
    setLoadingMore(true);

    const params: ApiParams = {
      endpoint: product.limited,
      query: {
        page,
        limit,
      },
    };

    apiCall<PaginatedProductResponseType>(params)
      .then(resp => {
        setData(prevData => ({
          ...prevData,
          data: {...prevData.data, ...resp},
          status: STATUS.SUCCESS,
        }));
        setHasNext(resp.next ? true : false);
        setLoadingMore(false);
      })
      .catch(error => {
        setData(prevData => ({
          ...prevData,
          message: error.message.toString(),
          status: STATUS.FAILED,
        }));
        setLoadingMore(false);
      });
  };

  return {...data, hasNext, loadingMore, refetch: fetchNext};
};
