import { test, expect, vitest } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import {
  BadgeType,
  ThemeMode,
  VerificationStatus
} from '../../src/utils/constants';
import NotificationIcon from '../../src/components/NotificationIcon.vue';

const mockIconClick = vitest.fn();

const mockSirenInject = vitest.fn().mockReturnValue({
  value: {
    stopRealTimeFetch: vitest.fn(),
    markAsReadById: vitest.fn()
  }
});

const mockStatus = vitest.fn().mockReturnValue({
  value: VerificationStatus.SUCCESS
});

test('matches snapshot', () => {
  const wrapper = mount(NotificationIcon, {
    props: {
      handleNotification: mockIconClick,
      badgeType: BadgeType.DEFAULT,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {}),
      hideBadge: false
    },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });

  expect(wrapper.element).toMatchSnapshot();
});

test('render notification icon with basic content', () => {
  const screen = render(NotificationIcon, {
    props: {
      handleNotification: mockIconClick,
      badgeType: BadgeType.DEFAULT,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });

  expect(screen.getByTestId('notification-icon-container')).toBeDefined();
});

test('trigger on click function when notification icon is clicked', () => {
  const screen = render(NotificationIcon, {
    props: {
      handleNotification: mockIconClick,
      badgeType: BadgeType.DOT,
      darkMode: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
  const button = screen.getByTestId('notification-icon-container');

  fireEvent.click(button);

  expect(mockIconClick).toHaveBeenCalled();
});
