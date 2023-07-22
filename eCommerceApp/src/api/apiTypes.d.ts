/*
 * Different HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/*
 * Endpoint response type or simply Endpoint Type
 */
export interface Endpoint {
  method: HttpMethod;
  url: string;
}

/*
 *Type of endpoints that collects multiple endpoints
 */

export type EndpointCollection = {
  [key: string]: Endpoint;
};

/*
 * API endpoint function type
 */
type ApiEndpointFunction = {
  get: (link: string) => void;
  post: (link: string) => void;
  put: (link: string) => void;
  delete: (link: string) => void;
  getEndpoints: () => EndpointCollection;
};

/*
 * Api response genenric type
 */
export interface ApiResponse<T> {
  data: T;
}

/*
 * Api error genenric type
 */
export interface ApiError {
  message: string;
}

/*
 * Api input params type
 */
export interface ApiParams {
  endpoint: {
    method: string;
    url: string;
  };
  path?: object;
  query?: object;
  data?: object;
  headers?: object;
}

/*
 * TO define custom error
 */

export interface CustomError<T = unknown> {
  message: string;
  data?: T;
}
