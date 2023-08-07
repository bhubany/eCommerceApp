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
    const fetchOptions: RequestInit = {
      method: endpoint.method || 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    };

    // Only include the 'body' property if the request method is not 'GET' or 'HEAD'
    if (endpoint.method && ['GET', 'HEAD'].indexOf(endpoint.method) === -1) {
      fetchOptions.body = data ? JSON.stringify(data) : undefined;
    }

    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      throw new Error(await response.text());
    }
    const contentType = response.headers.get('content-type');
    if (contentType?.startsWith('application/json')) {
      const responseData: T = await response.json();
      return responseData;
    } else {
      // Handle non-JSON responses (e.g., plain text or HTML)
      return (await response.text()) as T;
    }
  } catch (error) {
    throw error;
  }
}

export default apiCall;
