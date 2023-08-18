import React from 'react';

export interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  title?: string;
  onPress?: (p?: any) => void;
}
