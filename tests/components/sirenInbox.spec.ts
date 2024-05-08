import { test, expect, vitest, it } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import {
  VerificationStatus
} from '../../src/utils/constants';
import SirenInbox from '../../src/components/SirenInbox.vue';

const mockErrorFn = vitest.fn();

const mockSirenInject = vitest.fn().mockReturnValue({
  value: {
    stopRealTimeFetch: vitest.fn(),
    markAsReadById: vitest.fn()
  }
});

const mockStatus = vitest.fn().mockReturnValue({
  value: VerificationStatus.SUCCESS
});

const props = {
  title: 'Notifications',
  hideHeader: false,
  cardProps: { hideAvatar: false, showMedia: true },
  listEmptyComponent: undefined,
  customFooter: undefined,
  customHeader: undefined,
  noOfNotificationsPerFetch: 10,
  darkMode: true,
  onCardClick: undefined,
  customCard: undefined,
  windowViewOnly: false,
  notificationIcon: undefined,
  onError: mockErrorFn,
  theme: {
    dark: {
      colors: {
        primaryColor: '#FFFFFF'
      }
    },
    light: {}
  },
  customStyles: {
    notificationIcon: {
      size: 30
    }
  }
};

test('matches snapshot', () => {
  const wrapper = mount(SirenInbox, {
    props,
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test('render notification inbox with basic content', () => {
  const screen = render(SirenInbox, {
    props,
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });

  expect(screen.getByTestId('siren-inbox-container')).toBeDefined();
  const notificationIcon = screen.queryByTestId('siren-inbox-icon');

  expect(notificationIcon).toBeTruthy();
});

test('render notification inbox when window view', () => {
  const screen = render(SirenInbox, {
    props: { ...props, windowViewOnly: true },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
  const notificationIcon = screen.queryByTestId('siren-inbox-icon');

  expect(notificationIcon).toBeFalsy();
});

test('render notification inbox when not window view', () => {
  const screen = render(SirenInbox, {
    props: { ...props, windowViewOnly: false },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
  const notificationIcon = screen.queryByTestId('siren-inbox-icon');

  expect(notificationIcon).toBeTruthy();
});

it('opens modal when notification icon is clicked', () => {
  const { getByTestId } = render(SirenInbox, {
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
  const notificationIcon = getByTestId('siren-inbox-icon');

  fireEvent.click(notificationIcon);
});

it('closes modal when notification icon is clicked again', () => {
  const { getByTestId } = render(SirenInbox, {
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
  const notificationIcon = getByTestId('siren-inbox-icon');

  fireEvent.click(notificationIcon);
});
