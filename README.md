# Siren Vue Inbox

## Overview

The `@sirenapp/vue-inbox` sdk is a comprehensive and customizable Vue UI kit for displaying and managing notifications. This documentation provides comprehensive information on how to install, configure, and use the sdk effectively.

## 1. Installation

You can install the vue sdk from npm

```bash
npm install @sirenapp/vue-inbox
```

or from yarn

```bash
yarn add @sirenapp/vue-inbox
```

#### Prerequisites

- Vue3 (v3.0.0+)

## 2. Configuration

### 2.1 Initialization

Initialize the sdk with user token and recipient id. Wrap the provider around your App's root.

```vue

<template>
  <SirenProvider :config="config"> {/* Your app components */} </SirenProvider>
</template>

<script setup lang="ts">
import { SirenProvider } from "@sirenapp/vue-inbox";

const config = {
  userToken: "your_user_token",
  recipientId: "your_recipient_id",
};

</script>
```

### 2.2 Configure notification inbox

Once the provider is configured, next step is to configure the notification inbox

Inbox is a paginated list view for displaying notifications.

```vue
<template>
  <SirenInbox />
</template>

<script setup lang="ts">
import { SirenInbox } from "@sirenapp/vue-inbox";
</script>

```

#### Props for the notification inbox

Below are optional props available for the inbox component:

| Prop | Description | Type  | Default value |
|------|-------------|-------|---------------|
| theme | Object for custom themes | Theme | {} |
| loadMoreLabel  | Text shown on the load more component | string | "Load More" |
| hideBadge      | Toggle to hide or show the badge  | boolean | false |
| darkMode       | Toggle to enable dark mode    | boolean   | false  |
| itemsPerFetch  | Number of notifications fetch per api request (have a max cap of 50) | number | 20 |
| windowViewOnly | Toggle to enable fit-to-screen window or modal view | boolean | false |
| headerProps    | Props for customizing the header.<br> title - Title of the notification inbox<br> hideHeader - Toggle to hide or show the header section.<br> hideClearAll - Toggle to hide or show the clear all button. | HeaderProps  | { title: 'Notifications', <br>hideHeader: false,<br> hideClearAll: false } |
| cardProps      | Props for customizing the notification cards. <br>hideDelete - Toggle to hide or show delete icon<br> hideAvatar - Toggle to hide or show the avatar. <br> disableAutoMarkAsRead - Toggle to disable or enable the markAsReadById functionality on card click. <br> onAvatarClick - Custom click handler for avatar | CardProps | { hideDelete: false,<br> hideAvatar: false,<br> disableAutoMarkAsRead: false, <br> onAvatarClick: ()=>null } |
| onCardClick    | Custom click handler for notification cards | (notification)=> void | ()=>null  |
| onError        | Callback for handling errors | (error: SirenErrorType)=> void | ()=>null  |

#### Slots for the notification inbox

Below are optional slots available for the inbox component:

| Slot               | Description                        |
| ------------------ | ---------------------------------- |
| loadMoreComponent  | Custom load more button component  |
| customHeader       | Custom header component            |
| customLoader       | Custom loader component            |
| customErrorWindow  | Custom Error window                |
| listEmptyComponent | Custom Empty list component        |
| customCard         | Custom notification card component |
| customFooter       | Custom footer component            |

## 3. Customization

### 3.1 Themes

Here are the available theme options:

```js
type Theme = {
  dark: ThemeProps,
  light: ThemeProps,
};

type ThemeProps = {
  colors?: {
    primaryColor?: string,
    textColor?: string,
    neutralColor?: string,
    borderColor?: string,
    highlightedCardColor?: string,
    dateColor?: string,
    deleteIcon?: string,
    timerIcon?: string,
    clearAllIcon?: string,
    infiniteLoader?: string,
    windowShadowColor?: string,
  },
  badgeStyle?: {
    color?: string,
    textColor?: string,
  },
  window?: {
    borderColor?: string,
  },
  windowHeader?: {
    background?: string,
    titleColor?: string,
    headerActionColor?: string,
    borderColor?: string,
  },
  windowContainer?: {
    background?: string,
  },
  customCard?: {
    borderColor?: string,
    background?: string,
    titleColor?: string,
    subtitleColor?: string,
    descriptionColor?: string,
  },
  loadMoreButton?: {
    color?: string,
    background?: string,
  },
};
```

### 3.2 Style options

Here are the custom style options for the notification inbox

Please note that the badgeStyle, window shadow and border props are only applicable for modal view

```js
 type CustomStyle = {
  notificationIcon?: {
    size?: number,
  },
  window?: {
    width?: DimensionValue,
    borderRadius?: number,
  },
  windowHeader?: {
    height?: DimensionValue,
    titleFontWeight?:TextStyle["fontWeight"],
    titleSize?: number,
    titlePadding?: number,
    borderWidth?: string,
  },
  windowContainer?: {
    padding?: number,
    contentHeight?: DimensionValue,
  },
  customCard?: {
    padding?: number,
    borderWidth?: number,
    avatarSize?: number,
    titleFontWeight?: TextStyle["fontWeight"],
    titleSize?: number,
    subtitleFontWeight?: TextStyle['fontWeight'],
    subtitleSize?: number
    descriptionFontWeight?: TextStyle['fontWeight'],
    descriptionSize?: number,
    dateSize?: number,
  },
  loadMoreButton?: {
    fontSize?: number,
    fontWeight?: TextStyle["fontWeight"],
  },
  badgeStyle?: {
    size?: number,
    textSize?: number,
    top?: number,
    right?: number,
  },
  deleteIcon?:{
    size?: number,
  }
  dateIcon?:{
    size?: number,
  }
   timerIcon?: {
    size?: number,
  },
  clearAllIcon?:{
    size?: number,
  }
}
```

#### CardProps

```js
    type CardProps = {
      hideDelete?: boolean;
      hideAvatar?: boolean,
      onAvatarClick?: (notification: NotificationDataType) => void,
      disableAutoMarkAsRead?: boolean;
    };
```

#### HeaderProps

```js
    type HeaderProps = {
      title?: string;
      hideHeader?: boolean,
      hideClearAll?: boolean
    };
```

## 4. Hooks

`useSiren` is a hook that provides utility functions for modifying notifications.

```vue
<script setup lang="ts">
import { useSiren } from "@sirenapp/vue-inbox";

  const {
    markAsReadByDate,
    markAsReadById,
    deleteById,
    deleteByDate,
    markAllAsViewed
  } = useSiren();

  function handleMarkAsReadById(id) {
    markAsReadById(id);
  }

   function handleMarkAsReadByDate(untilDate) {
    markAsReadByDate(untilDate);
  }

  function handleDeleteById(id) {
    deleteById(id);
  }

  function handleDeleteByDate(date) {
    deleteByDate(date);
  }

  function handleMarkAllAsViewed(createdAt) {
    markAllAsViewed(createdAt);
  }

</script>
```

### useSiren functions

| Functions                     | Parameters | Type            | Description                                                          |
| ----------------------------- | ---------- | --------------- | -------------------------------------------------------------------- |
| markAsReadByDate              | startDate  | ISO date string | Sets the read status of notifications to true until the given date   |
| markAsReadById                | id         | string          | Set read status of a notification to true                            |
| deleteById                    | id         | string          | Delete a notification by id                                          |
| deleteByDate                  | startDate  | ISO date string | Delete all notifications until given date                            |
| markAllAsViewed               | startDate  | ISO date string | Sets the viewed status of notifications to true until the given date |


## Example

Here's a basic example to help you get started

```vue
<template>
  <SirenProvider
    :config="{
      userToken: 'your-user-token',
      recipientId: 'your-user-recipientId',
    }"
  >
    <SirenInbox
      :headerProps="{
        title: 'Siren Notifications',
        hideHeader: false,
        hideClearAll: true,
      }"
    />
  </SirenProvider>
</template>

<script setup lang="ts">
import { SirenProvider, SirenInbox } from "@sirenapp/vue-inbox";
</script>
```
