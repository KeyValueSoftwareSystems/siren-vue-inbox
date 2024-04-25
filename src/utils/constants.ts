export const COLORS = {
  light: {
    primaryColor: '#F56630',
    highlightedCardColor: '#FFECE5',
    textColor: '#344054',
    neutralColor: '#FFFFFF',
    borderColor: '#D0D5DD',
    dateColor: '#34405499',
    deleteIcon: '#34405499',
    timerIcon: '#667185',
    clearAllIcon: '#667185',
    clearAllDisabled: '#D0D5DD',
    windowShadowColor: '#D0D5DD',
    iconColor: '#F7F9FC',
    notificationIcon: '#232326',
    subTextColor: '#667185'
  },
  dark: {
    primaryColor: '#F56630',
    highlightedCardColor: '#2E2D30',
    textColor: '#FFFFFF',
    neutralColor: '#232326',
    borderColor: '#344054',
    dateColor: '#98A2B3',
    deleteIcon: '#D0D5DD',
    timerIcon: '#98A2B3',
    clearAllIcon: '#D0D5DD',
    clearAllDisabled: '#98A2B3',
    windowShadowColor: '#232326',
    iconColor: '#38383D',
    notificationIcon: '#FFFFFF',
    subTextColor: '#98A2B3'
  }
};

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum LogLevel {
  INFO,
  ERROR,
}

export enum BadgeType {
  NONE = 'none',
  DOT = 'dot',
  DEFAULT = 'default',
}

export const levelLogFns = {
  // eslint-disable-next-line no-console
  [LogLevel.INFO]: console.log,
  // eslint-disable-next-line no-console
  [LogLevel.ERROR]: console.error
};

export const defaultBadgeStyle = {
  size: 15,
  color: '#FF0000',
  textColor: '#FFFFFF',
  textSize: 10,
  linHeight: '14px',
  top: 'inherit',
  right: 'inherit',
  left: 'inherit'
};

export enum eventTypes {
  MARK_ITEM_AS_VIEWED = 'MARK_ITEM_AS_VIEWED',
  MARK_ITEM_AS_READ = 'MARK_ITEM_AS_READ',
  MARK_ALL_AS_READ = 'MARK_ALL_AS_READ',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ALL_ITEM = 'DELETE_ALL_ITEM',
  NEW_NOTIFICATIONS = 'NEW_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS_COUNT = 'UPDATE_NOTIFICATIONS_COUNT',
  RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS',
  RESET_NOTIFICATIONS_COUNT = 'RESET_NOTIFICATIONS_COUNT',
}

export enum events {
  NOTIFICATION_LIST_EVENT = 'NOTIFICATION_LIST_EVENT',
  NOTIFICATION_COUNT_EVENT = 'NOTIFICATION_COUNT_EVENT',
}

export const LIST_EMPTY_TEXT = 'No new notifications';
export const LIST_EMPTY_SUB_TEXT = 'Check back later for updates and alerts.';
export const ERROR_TEXT = 'Oops! Something went wrong';
export const ERROR_SUB_TEXT =
  'Could not load the notifications. Please refresh the page.';
export const DEFAULT_WINDOW_TITLE = 'Notifications';
export const RETRY_BUTTON_LABEL = 'Retry';
export const CLEAR_ALL_LABEL = 'Clear All';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const TOKEN_VERIFICATION_PENDING = 'TOKEN_VERIFICATION_PENDING';
export const MAXIMUM_RETRY_COUNT = 3;
export const MAXIMUM_ITEMS_PER_FETCH = 50;
export const DEFAULT_NOTIFICATION_FETCH_COUNT = 10;

export const errorMap = {
  SIREN_OBJECT_NOT_FOUND: {
    Type: 'ERROR',
    Code: 'OUTSIDE_SIREN_CONTEXT',
    Message: 'Trying to invoke function outside the siren context'
  },
  MISSING_PARAMETER: {
    Type: 'ERROR',
    Code: 'MISSING_PARAMETER',
    Message: 'Missing Parameter'
  },
  INVALID_CREDENTIALS: {
    Type: 'ERROR',
    Code: 'INVALID_CREDENTIALS',
    Message: 'Invalid credentials found. Please check your token and recipient ID.'
  }
};

export enum VerificationStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum EventType {
  NOTIFICATION = 'NOTIFICATIONS',
  UNVIEWED_COUNT = 'UNVIEWED_COUNT',
}
