export const COLORS = {
  light: {
    primaryColor: '#FA9874',
    highlightedCardColor: '#FFECE5',
    textColor: '#344054',
    neutralColor: '#FFFFFF',
    borderColor: '#D0D5DD',
    dateColor: '#667185',
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
    primaryColor: '#FA9874',
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

export const defaultBadgeStyle = {
  size: '15px',
  color: '#FF0000',
  textColor: '#FFFFFF',
  textSize: '10px',
  linHeight: '14px',
  top: 'inherit',
  left: 'inherit'
};

export const TOKEN_VERIFICATION_FAILED = 'TOKEN_VERIFICATION_FAILED';

export const errorMap = {
  SIREN_OBJECT_NOT_FOUND: {
    Type: 'ERROR',
    Code: 'SIREN_OBJECT_NOT_FOUND',
    Message: 'Siren Object Not found'
  },
  MISSING_PARAMETER: {
    Type: 'ERROR',
    Code: 'MISSING_PARAMETER',
    Message: 'Missing Parameter'
  }
};

export enum BadgeType {
  NONE = 'none',
  DOT = 'dot',
  DEFAULT = 'default',
}

export const LIST_EMPTY_TEXT = 'No new notifications';
export const LIST_EMPTY_SUB_TEXT = 'Check back later for updates and alerts.';
export const ERROR_TEXT = 'Oops! Something went wrong';
export const ERROR_SUB_TEXT =
  'Could not load the notifications. Please refresh the page.';
export const CLEAR_ALL_LABEL = 'Clear All';
export const DEFAULT_WINDOW_TITLE = 'Notifications';
export const DEFAULT_NOTIFICATION_FETCH_COUNT = 10;
