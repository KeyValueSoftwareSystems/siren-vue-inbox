import { COLORS, ThemeMode } from "./constants";

const defaultTheme = {
  light: {
    colors: {
      primaryColor: COLORS[ThemeMode.LIGHT].primaryColor,
      textColor: COLORS[ThemeMode.LIGHT].textColor,
      neutralColor: COLORS[ThemeMode.LIGHT].neutralColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      highlightedCardColor: COLORS[ThemeMode.LIGHT].highlightedCardColor,
      dateColor: COLORS[ThemeMode.LIGHT].dateColor,
      deleteIcon: COLORS[ThemeMode.LIGHT].deleteIcon,
      timerIcon: COLORS[ThemeMode.LIGHT].timerIcon,
      clearAllIcon: COLORS[ThemeMode.LIGHT].clearAllIcon
    },
    window: {
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      shadowColor: COLORS[ThemeMode.DARK].windowShadowColor
    },
    windowHeader: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      headerActionColor: COLORS[ThemeMode.LIGHT].textColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor
    },
    windowContainer: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
    },
    notificationCard: {
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      background: "transparent",
      descriptionColor: COLORS[ThemeMode.LIGHT].textColor,
    },
    loadMoreButton: {
      color: COLORS[ThemeMode.LIGHT].primaryColor,
      background: COLORS[ThemeMode.LIGHT].neutralColor,
    },
    deleteIcon: {
      color: COLORS[ThemeMode.LIGHT].deleteIcon,
    },
    clearIcon: {
      color: COLORS[ThemeMode.LIGHT].clearAllIcon,
    },
    timerIcon: {
      color: COLORS[ThemeMode.LIGHT].timerIcon,
    },
    loader: {
      backgroundImage:
        "linear-gradient(to right, #F0f0f0 0%, #E0E0E0 50%, #F0F0F0 100%)",
    },
  },
  dark: {
    colors: {
      primaryColor: COLORS[ThemeMode.DARK].primaryColor,
      textColor: COLORS[ThemeMode.DARK].textColor,
      neutralColor: COLORS[ThemeMode.DARK].neutralColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      highlightedCardColor: COLORS[ThemeMode.DARK].highlightedCardColor,
      dateColor: COLORS[ThemeMode.DARK].dateColor,
      deleteIcon: COLORS[ThemeMode.DARK].deleteIcon,
      timerIcon: COLORS[ThemeMode.DARK].timerIcon,
      clearAllIcon: COLORS[ThemeMode.DARK].clearAllIcon
    },
    window: {
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      shadowColor: COLORS[ThemeMode.DARK].windowShadowColor,
    },
    windowHeader: {
      background: COLORS[ThemeMode.DARK].neutralColor,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      headerActionColor: COLORS[ThemeMode.DARK].textColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
    },
    windowContainer: {
      background: COLORS[ThemeMode.DARK].neutralColor,
    },
    notificationCard: {
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      background: "transparent",
      titleColor: COLORS[ThemeMode.DARK].textColor,
      descriptionColor: COLORS[ThemeMode.DARK].textColor,
    },
    loadMoreButton: {
      color: COLORS[ThemeMode.LIGHT].primaryColor,
      background: COLORS[ThemeMode.DARK].neutralColor,
    },
    deleteIcon: {
      color: COLORS[ThemeMode.DARK].deleteIcon,
    },
    clearIcon: {
      color: COLORS[ThemeMode.DARK].clearAllIcon,
    },
    notificationIcon: {
      color: COLORS[ThemeMode.DARK].notificationIcon,
    },
    timerIcon: {
      color: COLORS[ThemeMode.DARK].timerIcon,
    },
    loader: {
      backgroundImage:
        "linear-gradient(to right, #49494A 0%, #535354 50%, #49494A 100%)",
    },
  },
};

export default defaultTheme;
