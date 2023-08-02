import {TOAST_TYPE} from 'common/enums';
import Toast from 'react-native-toast-message';

export const successToast = (message: string, message2?: string) =>
  Toast.show({
    type: TOAST_TYPE.SUCCESS,
    text1: message,
    text2: message2,
    visibilityTime: 2000,
  });

export const errorToast = (message: string, message2?: string) =>
  Toast.show({
    type: TOAST_TYPE.ERROR,
    text1: message,
    text2: message2,
    visibilityTime: 2000,
  });

export const infoToast = (message: string, message2?: string) =>
  Toast.show({
    type: TOAST_TYPE.INFO,
    text1: message,
    text2: message2,
    visibilityTime: 2000,
  });
