import {STATUS} from 'common/enums';

export interface FetchApiDataType<T> {
  data: T;
  status: STATUS;
  message: string | null;
}
