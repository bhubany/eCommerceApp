import {ApiParams} from 'api/apiTypes';
import Config from 'react-native-config';

async function apiCall<T>(params: ApiParams): Promise<T> {
  const {endpoint, path = {}, query = {}, data = {}, headers = {}} = params;
  const temp = {...endpoint};

  Object.entries(path).map(val => {
    temp.url = temp.url.replace(`:${val[0]}`, val[1]);
  });

  /*
   *Construct the full API URL with query parameters
   */
  const url = new URL(`${Config.API_BASE_URL}${temp.url}`);
  Object.entries(query).forEach(([key, value]) =>
    url.searchParams.append(key, String(value)),
  );

  try {
    const response = await fetch(url.toString(), {
      method: endpoint.method || 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}

export default apiCall;
