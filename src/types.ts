import { CSSProperties } from "vue";

// TODO: update prop type from any
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
  onNotificationCardClick?: (notification: any) => void;
  onError?: (error: any) => void;
};

// TODO: update prop type from any
export type SirenNotificationIconProps = {
  theme?: Theme;
  realTimeUnViewedCountEnabled?: boolean;
  onError?: (error: any) => void;
  darkMode?: boolean;
};

export type SirenProps = SirenInboxProps &
  SirenNotificationIconProps & {
    windowViewOnly?: boolean;
  };

export type CardProps = {
  hideAvatar?: boolean;
  showMedia?: boolean;
};

// TODO: update prop type from any
export type SirenPanelProps = {
  hideHeader: boolean;
  title: string;
  onNotificationCardClick?: (notification: any) => void;
  darkMode: boolean;
  styles: SirenStyleProps;
  windowViewOnly: boolean;
  showNotifications: boolean;
  onError?: (error: any) => void;
  noOfNotificationsPerFetch: number;
  hideClearAll: boolean;
};

export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
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

// TODO: update prop type from any
export type NotificationCardProps = {
  notification: any;
  cardProps: CardProps;
  onNotificationCardClick?: (notification: any) => void;
  styles: SirenStyleProps;
  deleteNotificationById: (id: string) => void;
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
    titleFontWeight?: TextStyle["fontWeight"];
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
    titleFontWeight?: TextStyle["fontWeight"];
    titleSize?: number;
    descriptionSize?: number;
    dateSize?: number;
  };
  loadMoreButton?: {
    fontSize?: number;
    fontWeight?: TextStyle["fontWeight"];
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

export type DimensionValue = number | string;

type TextStyle = {
  fontWeight?: CSSProperties["fontWeight"];
};

type NotificationCardThemeProps = {
  borderColor?: string;
  background?: string;
  titleColor?: string;
  descriptionColor?: string;
};

type LoadMoreButtonProps = {
  color?: string;
  background?: string;
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

export type EmptyListProps = {
  styles: SirenStyleProps;
  darkMode: boolean;
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

export type LoadMoreProps = {
  onLoadMore: () => void;
  paginationLoading: boolean;
  styles: SirenStyleProps;
};
