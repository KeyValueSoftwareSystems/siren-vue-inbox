import type { Ref } from 'vue';

import type {
  ActionResponse,
  NotificationDataType,
  NotificationsApiResponse
} from 'test_notification/dist/esm/types';
import type {
  CustomStyle,
  DimensionValue,
  SirenStyleProps,
  ThemeProps
} from '../types';
import {
  LogLevel,
  ThemeMode,
  defaultBadgeStyle,
  eventTypes
} from './constants';
import defaultStyles from './defaultStyles';
import defaultTheme from './defaultTheme';

type FetchParams = {
  size: number;
  start?: string;
  end?: string;
  sort?: 'createdAt' | 'updatedAt';
};

export const isEmptyArray = (array: Array<NotificationDataType> = []) =>
  array && array?.length === 0;

export const mergeArrays = (
  array1: Array<NotificationDataType> = [],
  array2: Array<NotificationDataType> = []
) => {
  if (array1 && array2) return [...array1, ...array2];
  if (array1) return array1;

  return array2;
};

export const filterDataProperty = (
  response: NotificationsApiResponse
): NotificationDataType[] | null => {
  if (!response.data) return null;

  return response.data;
};

export const generateFilterParams = (
  data: NotificationDataType[],
  fromStart: boolean,
  itemsPerPage: number
): FetchParams => {
  let params: FetchParams = { size: itemsPerPage, sort: 'createdAt' };

  if (data.length > 0)
    if (fromStart) params = { ...params, start: data[0].createdAt };
    else params = { ...params, end: data[data.length - 1].createdAt };

  return params;
};

export const isValidResponse = (
  response: NotificationsApiResponse | ActionResponse
): boolean => !!response?.data;

export const generateElapsedTimeText = (timeString: string) => {
  const currentTime = new Date().getTime();
  const targetTime = new Date(timeString).getTime();
  const millisecondsDiff = currentTime - targetTime;

  const seconds = Math.floor(millisecondsDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (millisecondsDiff < 60000) return 'Just now';
  if (minutes < 60)
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  if (days < 30) return days === 1 ? '1 day ago' : `${days} days ago`;
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;

  return years === 1 ? '1 year ago' : `${years} years ago`;
};

export const applyTheme = (
  theme: ThemeProps = {},
  mode: ThemeMode = ThemeMode.DARK,
  customStyle: CustomStyle = {}
): SirenStyleProps => {
  const windowBorderRadius =
    customStyle.window?.borderRadius || defaultStyles.window.borderRadius;

  return {
    container: {
      width: customStyle.window?.width || defaultStyles.window.width,
      maxWidth: customStyle.window?.width || '100'
    },
    windowShadow: {
      boxShadow: `${
        theme.colors?.windowShadowColor || defaultTheme[mode].window.shadowColor
      } 0px 8px 24px`
    },
    windowTopBorder: {
      borderTopLeftRadius: windowBorderRadius,
      borderTopRightRadius: windowBorderRadius
    },
    windowBottomBorder: {
      borderBottomLeftRadius: windowBorderRadius,
      borderBottomRightRadius: windowBorderRadius
    },
    contentContainer: {
      backgroundColor:
        theme.windowContainer?.background ||
        theme.colors?.neutralColor ||
        defaultTheme[mode].windowContainer.background,
      padding:
        customStyle.windowContainer?.padding ||
        defaultStyles.windowContainer.padding,
      borderRadius: `0 0 ${
        customStyle.window?.borderRadius || defaultStyles.window.borderRadius
      } ${
        customStyle.window?.borderRadius || defaultStyles.window.borderRadius
      }`
    },
    body: {
      overflow: 'auto',
      height: customStyle.windowContainer?.contentHeight || '700px'
    },
    headerContainer: {
      backgroundColor:
        theme.windowHeader?.background ||
        theme.colors?.neutralColor ||
        defaultTheme[mode].windowHeader.background,
      borderBottom: `0.5px solid ${
        theme.colors?.borderColor || defaultTheme[mode].colors.borderColor
      }`,
      height:
        customStyle.windowHeader?.height || defaultStyles.windowHeader.height
    },
    headerTitle: {
      alignItems: 'center',
      display: 'flex',
      margin: 0,
      lineHeight: '28px',
      color:
        theme.windowHeader?.titleColor ||
        theme.colors?.textColor ||
        defaultTheme[mode].windowHeader.titleColor,
      fontSize:
        customStyle.windowHeader?.titleSize ||
        defaultStyles.windowHeader.titleSize,
      fontWeight:
        customStyle.windowHeader?.titleFontWeight ||
        defaultStyles.windowHeader.titleFontWeight,
      paddingLeft:
        customStyle.windowHeader?.titlePadding ||
        defaultStyles.windowHeader.titlePadding
    },
    headerAction: {
      color:
        theme.windowHeader?.headerActionColor ||
        theme.colors?.textColor ||
        defaultTheme[mode].windowHeader.headerActionColor
    },
    defaultCardContainer: {
      backgroundColor:
        theme.notificationCard?.background ||
        defaultTheme[mode].notificationCard.background,
      padding:
        customStyle.notificationCard?.padding ||
        defaultStyles.notificationCard.padding,
      borderBottom: `${
        customStyle.notificationCard?.borderWidth ||
        defaultStyles.notificationCard.borderWidth
      }px solid`,
      borderColor:
        theme.notificationCard?.borderColor ||
        theme.colors?.borderColor ||
        defaultTheme[mode].notificationCard.borderColor
    },
    cardIconRound: {
      width: `${
        customStyle.notificationCard?.avatarSize ||
        defaultStyles.notificationCard.avatarSize
      }px`,
      height: `${
        customStyle.notificationCard?.avatarSize ||
        defaultStyles.notificationCard.avatarSize
      }px`,
      borderRadius: `${
        (parseInt(String(customStyle.notificationCard?.avatarSize), 10) ||
          defaultStyles.notificationCard.avatarSize) / 2
      }px`,
      overflow: 'hidden',
      backgroundColor:
        theme.colors?.borderColor || defaultTheme[mode].colors.borderColor
    },
    cardTitle: {
      color:
        theme.notificationCard?.titleColor ||
        theme.colors?.textColor ||
        defaultTheme[mode].notificationCard.titleColor,
      fontSize:
        customStyle.notificationCard?.titleSize ||
        defaultStyles.notificationCard.titleSize,
      fontWeight:
        customStyle.notificationCard?.titleFontWeight ||
        defaultStyles.notificationCard.titleFontWeight
    },
    activeCardMarker: {
      backgroundColor:
        theme.colors?.highlightedCardColor ||
        defaultTheme[mode].colors?.highlightedCardColor,
      border:
        theme.colors?.primaryColor || defaultTheme[mode].colors?.primaryColor
    },
    cardDescription: {
      color:
        theme.notificationCard?.descriptionColor ||
        theme.colors?.textColor ||
        defaultTheme[mode].notificationCard.descriptionColor,
      fontSize:
        customStyle.notificationCard?.descriptionSize ||
        defaultStyles.notificationCard.descriptionSize,
      fontWeight: '400'
    },
    dateStyle: {
      color: theme.colors?.dateColor || defaultTheme[mode].colors.dateColor,
      fontSize:
        customStyle.notificationCard?.dateSize ||
        defaultStyles.notificationCard.dateSize,
      lineHeight: '16px'
    },
    emptyText: {
      color: theme.colors?.textColor || defaultTheme[mode].colors.textColor
    },
    errorText: {
      color: theme.colors?.textColor || defaultTheme[mode].colors.textColor
    },
    clearIcon: {
      color: theme.colors?.clearAllIcon || defaultTheme[mode].clearIcon.color,
      size: customStyle.clearAllIcon?.size || defaultStyles.clearAllIcon.size
    },
    timerIcon: {
      color: theme.colors?.timerIcon || defaultTheme[mode].timerIcon.color,
      size: customStyle.timerIcon?.size || defaultStyles.timerIcon.size
    },
    notificationIcon: {
      size:
        customStyle?.notificationIcon?.size ||
        defaultStyles?.notificationIcon?.size
    },
    deleteIcon: {
      color: theme.colors?.deleteIcon || defaultTheme[mode].colors.deleteIcon,
      size: customStyle.deleteIcon?.size || defaultStyles.deleteIcon.size
    },
    loadMoreButton: {
      color:
        theme?.loadMoreButton?.color ||
        theme.colors?.primaryColor ||
        defaultTheme[mode]?.loadMoreButton?.color,
      backgroundColor:
        theme?.loadMoreButton?.background ||
        defaultTheme[mode]?.loadMoreButton?.background,
      fontSize:
        customStyle?.loadMoreButton?.fontSize ||
        defaultStyles?.loadMoreButton?.fontSize,
      fontWeight:
        customStyle.loadMoreButton?.fontWeight ||
        defaultStyles.loadMoreButton.fontWeight
    },
    loader: {
      backgroundImage: defaultTheme[mode].loader.backgroundImage,
      borderColor:
        theme.colors?.primaryColor || defaultTheme[mode].colors.primaryColor
    },
    badgeStyle: {
      borderRadius: customStyle.badgeStyle?.size || defaultBadgeStyle.size,
      minWidth: customStyle.badgeStyle?.size || defaultBadgeStyle.size,
      height: customStyle.badgeStyle?.size || defaultBadgeStyle.size,
      backgroundColor: theme.badgeStyle?.color || defaultBadgeStyle.color,
      top: `${customStyle.badgeStyle?.top}px` || defaultBadgeStyle.top,
      left: `${customStyle.badgeStyle?.left}px` || defaultBadgeStyle.left
    },
    badgeTextStyle: {
      color: theme.badgeStyle?.textColor || defaultBadgeStyle.textColor,
      fontSize: customStyle.badgeStyle?.textSize || defaultBadgeStyle.textSize
    },
    infiniteLoader: {
      border: `3px solid ${
        theme.colors?.infiniteLoader ||
        theme.colors?.primaryColor ||
        defaultTheme[mode].colors.primaryColor
      }`
    }
  };
};

export const calculateModalPosition = (
  iconRef: Ref<HTMLElement | null>,
  window: Window,
  containerWidth: DimensionValue
) => {
  if (iconRef.value) {
    const iconRect = iconRef.value.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const spaceRight = screenWidth - iconRect.x;
    const spaceLeft = iconRect.x;
    let modalWidth = 400;

    if (typeof containerWidth === 'string')
      modalWidth = parseInt(containerWidth.slice(0, -2), 10);
    else if (typeof containerWidth === 'number') modalWidth = containerWidth;

    const topPosition = iconRect.bottom;
    const leftPosition = screenWidth / 2 - modalWidth / 2;

    if (
      spaceLeft < modalWidth &&
      spaceRight < modalWidth &&
      screenWidth > modalWidth
    )
      return { top: `${topPosition}px`, left: `-${leftPosition}px` };

      const rightPosition = spaceRight < modalWidth + 30 ? '30px' : null;

      return {
        top: `${topPosition}px`,
        ...(rightPosition && { right: rightPosition })
      };
  }

  return { top: '0' };
};

export const updateNotifications = (
  eventData: {
    id?: string;
    action: string;
    newNotifications?: NotificationDataType[];
    unreadCount?: number;
  },
  notifications: NotificationDataType[]
): NotificationDataType[] => {
  let updatedNotifications: NotificationDataType[] = [];

  switch (eventData.action) {
    case eventTypes.MARK_ITEM_AS_READ:
      updatedNotifications = notifications.map((item) =>
        item.id === eventData.id ? { ...item, isRead: true } : item
      );
      break;
    case eventTypes.MARK_ALL_AS_READ:
      updatedNotifications = notifications.map((item) => ({
        ...item,
        isRead: true
      }));
      break;
    case eventTypes.DELETE_ITEM:
      updatedNotifications = notifications.filter(
        (item) => item.id !== eventData.id
      );
      break;
    case eventTypes.DELETE_ALL_ITEM:
      updatedNotifications = [];
      break;
    case eventTypes.NEW_NOTIFICATIONS: {
      const newNotifications: NotificationDataType[] =
        eventData?.newNotifications || [];

      updatedNotifications = [...newNotifications, ...notifications];
      break;
    }
    case eventTypes.RESET_NOTIFICATIONS: {
      updatedNotifications = [];
      break;
    }
    default:
      break;
  }

  return updatedNotifications;
};

export const logger = {
  log: async (level: LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level].toUpperCase();

    console.log(`[${timestamp}] [${levelString}] ${message}`);
  },
  error(error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info(message: string) {
    this.log(LogLevel.INFO, message);
  }
};

export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): void => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
