import {SetStateAction, Dispatch} from 'react';
export interface CheckBoxProps {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  checkColor?: string;
  checkFontSize?: string;
  textColor?: string;
  textFontSize?: string;
  height?: string;
  width?: string;
  filled?: boolean;
  checked?: boolean;
  setIsChecked?: Dispatch<SetStateAction<boolean>>;
  text: string;
}
