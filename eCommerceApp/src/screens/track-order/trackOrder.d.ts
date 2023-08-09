import {ReactNode} from 'react';

export interface TrackOrderStepper {
  id: number;
  status: string;
  stepDetail: string;
  textColor?: string;
  stepIcon: ReactNode;
  showProgress?: boolean;
}
