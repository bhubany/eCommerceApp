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
