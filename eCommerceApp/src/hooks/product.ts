import apiCall, {ApiParams} from 'api';
import {product} from 'api/endpoint';
import {STATUS} from 'common/enums';
import {
  PaginatedProductInputType,
  PaginatedProductResponseType,
  ProductType,
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

interface SearchProductResponse extends FetchApiDataType<ProductType[]> {
  fetch: (keyword: string) => void;
}

export const useSearchProducts = (): SearchProductResponse => {
  const [data, setData] = useState<FetchApiDataType<ProductType[]>>({
    data: [],
    status: STATUS.PENDING,
    message: null,
  });

  const fetchData = useCallback((input: any) => {
    setData(prev => ({
      ...prev,
      status: STATUS.LOADING,
    }));

    const params: ApiParams = {
      endpoint: product.search,
      path: {keyword: input},
    };

    apiCall<ProductType[]>(params)
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
