import {ReactNode} from 'react';

export interface OrderStatusProps {
  stepIcon: ReactNode;
  stepDetail: string;
  textColor?: string;
  textDecoration?: string;
  lineHeight?: string;
  fontSize?: string;
  fontFamily?: string;
  padding?: string;
  margin?: string;
  fontWeight?: string;
  textAlign?: string;
  textWidth?: string;
  textHeight?: string;
  overflow?: string;
  showProgress?: boolean;
  progressColor?: string;
  progressWidth?: string;
  progressStyle?: string;
  progressHeight?: string;
}
