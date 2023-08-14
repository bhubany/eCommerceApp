import {COLORS, ORDER_STATUS, SHIPMENT_STATUS} from 'common/enums';
import {TrackOrderStepper} from 'screens/track-order/trackOrder';
import {
  AcceptedIcon,
  CancelledIcon,
  CompletedIcon,
  DeliveredIcon,
  PendingIcon,
  ReplacementIcon,
  ReturnedIcon,
  VehicleIcon,
} from '../../componennts/Icons';

export const stepper: TrackOrderStepper[] = [
  {
    id: 1,
    status: ORDER_STATUS.PENDING,
    stepDetail: 'Your order is waiting for approval',
    textColor: COLORS.INVERSE,
    stepIcon: PendingIcon,
    showProgress: true,
  },
  {
    id: 2,
    status: ORDER_STATUS.ACCEPTED,
    stepDetail: 'Your ordr has been accepted. Packaging is ongoing',
    textColor: COLORS.INVERSE,
    stepIcon: AcceptedIcon,
    showProgress: true,
  },
  {
    id: 3,
    status: ORDER_STATUS.SHIPPED,
    stepDetail: 'Your package is on the way',
    textColor: COLORS.INVERSE,
    stepIcon: VehicleIcon,
    showProgress: true,
  },
  {
    id: 4,
    status: ORDER_STATUS.DELIVERED,
    stepDetail: 'Your package has been delivered',
    textColor: COLORS.INVERSE,
    stepIcon: DeliveredIcon,
    showProgress: true,
  },
  {
    id: 5,
    status: ORDER_STATUS.COMPLETED,
    stepDetail: 'Your order completed successfully',
    textColor: COLORS.SUCCESS,
    stepIcon: CompletedIcon,
    showProgress: false,
  },
];

export const extraSteps: TrackOrderStepper[] = [
  {
    id: 6,
    status: ORDER_STATUS.CANCELLED,
    stepDetail: 'Your order has been cancelled',
    textColor: COLORS.ERROR,
    stepIcon: CancelledIcon,
    showProgress: false,
  },

  {
    id: 7,
    status: SHIPMENT_STATUS.RETURNED,
    stepDetail: 'Your package has been placed for Returned',
    textColor: COLORS.CORAL,
    stepIcon: ReturnedIcon,
    showProgress: false,
  },
  {
    id: 8,
    status: SHIPMENT_STATUS.REPLACED,
    stepDetail: 'Your package has been placed for replacement',
    textColor: COLORS.CORAL,
    stepIcon: ReplacementIcon,
    showProgress: false,
  },
];
