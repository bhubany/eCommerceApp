import React from 'react';

export interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  title?: string;
  onSave?: () => any;
  showFooter?: boolean;
}
