import {React} from 'react';

export interface UpdateQuantityProps {
  quantity: string;
  availableQuantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
}
