import { test, expect, vitest } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import { ThemeMode } from '../../src/utils/constants';
import NotificationCard from '../../src/components/NotificationCard.vue';

const mockNotification = {
  id: '1',
  createdAt: '2024-02-24T12:00:00Z',
  message: {
    header: 'New Message',
    body: 'You have a new message.',
    channel: 'watsapp',
    subHeader: 'New post',
    actionUrl: '',
    additionalData: '',
    avatar: {
      imageUrl: '',
      actionUrl: ''
    }
  },
  requestId: '123',
  isRead: false
};

const mockDeleteNotificationById = vitest.fn();
const mockOnNotificationCardClick = vitest.fn();

const mockSirenInject = vitest.fn().mockReturnValue({
  value: {
    markAsReadById: vitest.fn()
  }
});

test('matches snapshot', () => {
  const wrapper = mount(NotificationCard, {
    props: {
      notification: mockNotification,
      cardProps: {},
      onCardClick: mockOnNotificationCardClick,
      deleteById: mockDeleteNotificationById,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject
      }
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test('render notification card with basic content', () => {
  const screen = render(NotificationCard, {
    props: {
      notification: mockNotification,
      cardProps: {},
      onCardClick: mockOnNotificationCardClick,
      deleteById: mockDeleteNotificationById,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject
      }
    }
  });

  expect(screen.getByTestId('notification-card-container')).toBeDefined();

  const header = screen.getByText(mockNotification.message.header);
  const subHeader = screen.getByText(mockNotification.message.subHeader);
  const body = screen.getByText(mockNotification.message.body);

  expect(header).toBeTruthy();
  expect(subHeader).toBeTruthy();
  expect(body).toBeTruthy();
});

test('trigger delete notification callback on delete button click', async () => {
  const screen = render(NotificationCard, {
    props: {
      notification: mockNotification,
      cardProps: {},
      onCardClick: mockOnNotificationCardClick,
      deleteById: mockDeleteNotificationById,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject
      }
    }
  });

  const deleteButton = screen.getByTestId('delete-notification-button');

  fireEvent.click(deleteButton);

  await waitFor(() => expect(mockDeleteNotificationById)
  .toHaveBeenCalledTimes(1), { timeout: 2000 });
});

test('trigger notification card click on card click', async () => {
  const screen = render(NotificationCard, {
    props: {
      notification: mockNotification,
      cardProps: {},
      onCardClick: mockOnNotificationCardClick,
      deleteById: mockDeleteNotificationById,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject
      }
    }
  });

  const card = screen.getByTestId('notification-card-container');

  fireEvent.click(card);

  await waitFor(() => expect(mockOnNotificationCardClick)
    .toHaveBeenCalledTimes(1), { timeout: 2000 });
});

test('does not render avatar if hideAvatar is true', () => {
  const screen = render(NotificationCard, {
    props: {
      notification: mockNotification,
      cardProps: { hideAvatar: true },
      onCardClick: mockOnNotificationCardClick,
      deleteById: mockDeleteNotificationById,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject
      }
    }
  });

  const avatar = screen.queryByTestId('avatar-container');

  expect(avatar).toBeNull();
});
