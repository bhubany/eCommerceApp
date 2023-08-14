import {COLORS} from 'common/enums';
import {Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const getMuiIcons = (name: string, color?: string, size?: number) => (
  <MaterialIcons name={name} color={color ?? COLORS.CORAL} size={size ?? 50} />
);

export const DeliveredIcon = (
  <Image
    source={require('../../assets/icons/delivered.png')}
    style={{height: 50, width: 50}}
  />
);

export const SearchIcon = getMuiIcons('search', COLORS.WHITE, 20);
export const VehicleIcon = getMuiIcons('local-shipping');
export const PendingIcon = getMuiIcons('pending', COLORS.INFO);
export const AcceptedIcon = getMuiIcons('check-circle-outline', COLORS.SUCCESS);
export const CompletedIcon = getMuiIcons('verified', COLORS.SUCCESS);
export const CancelledIcon = getMuiIcons('cancel', COLORS.ERROR);
export const ReturnedIcon = getMuiIcons('assignment-return');
export const ReplacementIcon = getMuiIcons('find-replace');
export const ArrowBackIcon = getMuiIcons('arrow-back', COLORS.WHITE, 30);
export const NextIcon = getMuiIcons('skip-next', COLORS.WHITE);
export const PreviousIcon = getMuiIcons('skip-previous', COLORS.WHITE);
export const ShoppingCartIcon = getMuiIcons('shopping-cart', COLORS.CORAL, 40);
export const AddToCartIcon = getMuiIcons('add-shopping-cart', COLORS.WHITE, 20);
export const InventoryIcon = getMuiIcons('inventory', COLORS.WHITE, 20);
export const AddIcon = getMuiIcons('add', COLORS.SUCCESS, 30);
export const SubtractIcon = getMuiIcons('remove', COLORS.ERROR, 30);
export const DownloadIcon = getMuiIcons('cloud-download', COLORS.WHITE, 16);
export const HomeIcon = getMuiIcons('home', COLORS.PRIMARY, 24);
export const TrackOrderIcon = getMuiIcons('local-shipping', COLORS.PRIMARY, 24);
export const SearchIcon24 = getMuiIcons('search', COLORS.PRIMARY, 24);
