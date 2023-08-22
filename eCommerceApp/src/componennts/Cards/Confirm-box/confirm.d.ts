import {ReactNode} from 'react';

export interface ConfirmProps {
  header?: string | ReactNode;
  body?: string | ReactNode;
  footer?: string | ReactNode;
  onYes?: () => any;
  onNo?: () => any;
}
