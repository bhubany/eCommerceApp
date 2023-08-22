import {ProductType} from 'common/types';

export interface CartCardProps {
  product: ProductType;
  handleView?: () => any;
  handleEdit?: () => any;
  handleDelete?: () => any;
}
