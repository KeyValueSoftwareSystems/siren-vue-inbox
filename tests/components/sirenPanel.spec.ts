import { test, expect, vitest, it } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import {
  ThemeMode,
  VerificationStatus
} from '../../src/utils/constants';
import SirenPanel from '../../src/components/SirenPanel.vue';

const mockErrorFn = vitest.fn();

const mockSirenInject = vitest.fn().mockReturnValue({
  value: {
    startRealTimeFetch: vitest.fn(),
    stopRealTimeFetch: vitest.fn(),
    fetchAllNotifications: vitest.fn(),
    markAsReadById: vitest.fn()
  }
});

const mockStatus = vitest.fn().mockReturnValue({
  value: VerificationStatus.SUCCESS
});

const props = {
  darkMode: false,
  styles: applyTheme({}, ThemeMode.DARK, {}),
  showNotifications: true,
  onError: mockErrorFn,
  itemsPerFetch: 10,
  hideBadge: false,
  headerProps: { hideHeader: false },
  cardProps: { hideAvatar: false, showMedia: true },
  modalWidth: 500,
  windowViewOnly: false,
  loadMoreLabel: 'Load more'
};

test('matches snapshot', () => {
  const wrapper = mount(SirenPanel, {
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

test('render notification panel with basic content', () => {
  const screen = render(SirenPanel, {
    props,
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });

  expect(screen.getByTestId('siren-panel-container')).toBeDefined();
});

test('render when title is passed', () => {
  const { getByText } = render(SirenPanel, {
    props: { ...props, title: 'Notifications' },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });

  const title = getByText('Notifications');

  expect(title).toBeTruthy();
});

test('hide header when hideHeader prop is true', () => {
  const headerProps = { hideHeader: true };

  render(SirenPanel, {
    props: { ...props, headerProps },
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
});

it('calls onError callback if an error occurs', async () => {
  // Mocking an error response from the server
  vitest.spyOn(global, 'fetch').mockRejectedValueOnce({
    json: async () => ({
      Code: 'OUTSIDE_SIREN_CONTEXT',
      Message: 'Trying to invoke function outside the siren context',
      Type: 'ERROR'
    })
  });
  render(SirenPanel, {
    props,
    global: {
      provide: {
        siren: mockSirenInject,
        verificationStatus: mockStatus
      }
    }
  });
  await waitFor(() => {
    expect(mockErrorFn).toHaveBeenCalled();
  });
});
