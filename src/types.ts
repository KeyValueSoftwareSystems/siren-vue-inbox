import type { CSSProperties } from 'vue';
import type {
  NotificationDataType,
  SirenErrorType
} from 'test_notification/dist/esm/types';

type WindowProps = {
  borderColor?: string;
};

type WindowHeaderProps = {
  background?: string;
  titleColor?: string;
  headerActionColor?: string;
  borderColor?: string;
};

type WindowContainerProps = {
  background?: string;
};

type NotificationCardThemeProps = {
  borderColor?: string;
  background?: string;
  titleColor?: string;
  descriptionColor?: string;
};

export type SirenStyleProps = {
  container: CSSProperties;
  contentContainer: CSSProperties;
  headerContainer: CSSProperties;
  headerTitle: CSSProperties;
  headerAction: CSSProperties;
  defaultCardContainer: CSSProperties;
  cardIconRound: CSSProperties;
  cardTitle: CSSProperties;
  activeCardMarker: CSSProperties;
  cardDescription: CSSProperties;
  dateStyle: CSSProperties;
  emptyText: CSSProperties;
  errorText: CSSProperties;
  clearIcon: { size?: number; color?: string };
  timerIcon: { size?: number; color?: string };
  notificationIcon: { size?: number; color?: string };
  loadMoreButton: CSSProperties;
  loader: CSSProperties;
  body: CSSProperties;
  deleteIcon: { size?: number; color?: string };
  badgeStyle: CSSProperties;
  badgeTextStyle: CSSProperties;
  windowTopBorder: CSSProperties;
  windowBottomBorder: CSSProperties;
  infiniteLoader: CSSProperties;
  windowShadow: CSSProperties;
};

export type DimensionValue = number | string;

type TextStyle = {
  fontWeight?: CSSProperties['fontWeight'];
};

export type EmptyListProps = {
  styles: SirenStyleProps;
  darkMode: boolean;
};

export type LoadMoreProps = {
  onLoadMore: () => void;
  paginationLoading: boolean;
  styles: SirenStyleProps;
};

type LoadMoreButtonProps = {
  color?: string;
  background?: string;
};

export type ThemeProps = {
  colors?: {
    primaryColor?: string;
    textColor?: string;
    neutralColor?: string;
    borderColor?: string;
    highlightedCardColor?: string;
    dateColor?: string;
    deleteIcon?: string;
    timerIcon?: string;
    clearAllIcon?: string;
    infiniteLoader?: string;
    windowShadowColor?: string;
  };
  window?: WindowProps;
  windowHeader?: WindowHeaderProps;
  windowContainer?: WindowContainerProps;
  notificationCard?: NotificationCardThemeProps;
  loadMoreButton?: LoadMoreButtonProps;
  badgeStyle?: {
    color?: string;
    textColor?: string;
  };
};

export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};

export type CustomStyle = {
  notificationIcon?: {
    size?: number;
  };
  window?: {
    width?: DimensionValue;
    borderRadius?: number;
  };
  windowHeader?: {
    height?: DimensionValue;
    titleFontWeight?: TextStyle['fontWeight'];
    titleSize?: number;
    titlePadding?: number;
  };
  windowContainer?: {
    padding?: number;
    contentHeight?: DimensionValue;
  };
  notificationCard?: {
    padding?: number;
    borderWidth?: number;
    avatarSize?: number;
    titleFontWeight?: TextStyle['fontWeight'];
    titleSize?: number;
    descriptionSize?: number;
    dateSize?: number;
  };
  loadMoreButton?: {
    fontSize?: number;
    fontWeight?: TextStyle['fontWeight'];
  };
  badgeStyle?: {
    size?: number;
    textSize?: number;
    top?: number;
    left?: number;
  };
  deleteIcon?: {
    size?: number;
  };
  timerIcon?: {
    size?: number;
  };
  clearAllIcon?: {
    size?: number;
  };
};

export type CardProps = {
  hideAvatar?: boolean;
  showMedia?: boolean;
};

export type SirenInboxProps = {
  theme?: Theme;
  customStyle?: CustomStyle;
  title?: string;
  loadMoreLabel?: string;
  hideHeader?: boolean;
  hideClearAll?: boolean;
  darkMode?: boolean;
  cardProps?: CardProps;
  noOfNotificationsPerFetch?: number;
  onNotificationCardClick?: (notification: NotificationDataType) => void;
  onError?: (error: SirenErrorType) => void;
};

export type SirenNotificationIconProps = {
  theme?: Theme;
  realTimeUnViewedCountEnabled?: boolean;
  onError?: (error: SirenErrorType) => void;
  darkMode?: boolean;
};

export type SirenProviderConfigProps = {
  userToken: string;
  recipientId: string;
};

export type SirenProps = SirenInboxProps &
  SirenNotificationIconProps & {
    windowViewOnly?: boolean;
  };

type BadgeType = 'none' | 'dot' | 'default';

export type SirenNotificationButtonProps = {
  styles: SirenStyleProps;
  badgeType: BadgeType;
  darkMode: boolean;
  hideBadge: boolean;
  onIconClick: () => void;
};

export type SirenPanelProps = {
  hideHeader: boolean;
  title: string;
  onNotificationCardClick?: (notification: NotificationDataType) => void;
  darkMode: boolean;
  styles: SirenStyleProps;
  windowViewOnly: boolean;
  showNotifications: boolean;
  onError?: (error: SirenErrorType) => void;
  noOfNotificationsPerFetch: number;
  hideClearAll: boolean;
};

export type NotificationCardProps = {
  notification: NotificationDataType;
  cardProps: CardProps;
  onNotificationCardClick?: (notification: NotificationDataType) => void;
  styles: SirenStyleProps;
  deleteNotificationById: (id: string) => void;
};

export type ErrorWindowProps = {
  styles: SirenStyleProps;
  darkMode: boolean;
  error: string;
};

export type HeaderProps = {
  title: string;
  enableClearAll?: boolean;
  handleClearAllNotification: () => void;
  styles: SirenStyleProps;
  windowViewOnly: boolean;
  hideClearAll: boolean;
};
