export enum COLORS {
  PRIMARY = '#1976d2',
  SECONDARY = '#1b5693',
  INFO = '#5bc0de',
  WARNING = '#f0ad4e',
  DANGER = '#d9534f',
  INVERSE = '#292b2c',
  FADED = '#f7f7f7',
  SUCCESS = '#00C853',
  NAPIES_YELLOW = '#ffdb60',
  GOLDEN_YELLOW = '#FBB928',
  CORAL = '#fc7651',
  WHITE = '#ffffff',
  GREY = '#808080',
  LIGHT_GREY = '#D2D2D3',
  BLACK = '#000000',
  ERROR = '#cc0000',
  RED = '#ff0000',
  GREEN = '#00ff00',
  BLUE = '#0000ff',
}

export enum TOAST_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export enum STATUS {
  PENDING = 'pending',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
  COMPLETED = 'completed',
}

export enum PAYMENT_METHOD {
  CASH = 'cash',
  ESEWA = 'e-sewa',
  KHALTI = 'khalti',
}

export enum PAYMENT_STATUS {
  PAID = 'paid',
  UNPAID = 'unPaid',
}

export enum SHIPMENT_TYPE {
  OUTSIDE_VALLEY = 'outside valley',
  INSIDE_VALLEY = 'inside valley',
}

export enum SHIPMENT_STATUS {
  PENDING = 'pending',
  PRE_TRANSIT = 'pre-transit',
  IN_TRANSIT = 'in-transit',
  WAITING_FOR_DELIVEERY = 'waiting-for-deliverey',
  OUT_OF_DELIVERY = 'out-of-deliverey',
  FAILED_ATTEMPT = 'failed-attempt',
  DELIVERED = 'delivered',
  REPLACED = 'replaced',
  RETURNED = 'returned',
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in-progress',
  SHIPPED = 'shipped',
  FAILED = 'failed',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum QUANTITY {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export enum CART_STATUS {
  ACTIVE = 'active',
  DE_ACTIVE = 'deactive',
}
