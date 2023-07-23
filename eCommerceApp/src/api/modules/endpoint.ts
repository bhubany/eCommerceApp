import {ApiEndpointFunction, Endpoint} from 'api/apiTypes';

export const apiEndpoint = (name: string): ApiEndpointFunction => {
  const endpointObjects: {[key: string]: Endpoint} = {};

  /*
   *Check for path parameter, if present slice out
   */

  const key = (link: string) => {
    if (link.indexOf('/:') !== -1) {
      return link.slice(0, link.indexOf('/:'));
    }
    return link;
  };

  return {
    get: (link: string) => {
      endpointObjects[key(link)] = {method: 'GET', url: `/${name}/${link}`};
    },
    post: (link: string) => {
      endpointObjects[key(link)] = {method: 'POST', url: `/${name}/${link}`};
    },
    put: (link: string) => {
      endpointObjects[key(link)] = {method: 'PUT', url: `/${name}/${link}`};
    },
    delete: (link: string) => {
      endpointObjects[key(link)] = {method: 'DELETE', url: `/${name}/${link}`};
    },
    getEndpoints: () => endpointObjects,
  };
};
