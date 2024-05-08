import { test, expect, vitest } from 'vitest';
import { fireEvent, queryByAttribute, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import { ThemeMode } from '../../src/utils/constants';
import HeaderComponent from '../../src/components/HeaderComponent.vue';

const getById = queryByAttribute.bind(null, 'data-testid');
const mockClearAllFunction = vitest.fn();

test('matches snapshot', () => {
  const wrapper = mount(HeaderComponent, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      title: 'Sample Header',
      enableClearAll: true,
      handleClearAllNotification: mockClearAllFunction,
      windowViewOnly: false,
      hideClearAll: false
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test('render header component with basic content', () => {
  const screen = render(HeaderComponent, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      title: 'Sample Header',
      enableClearAll: true,
      handleClearAllNotification: mockClearAllFunction,
      windowViewOnly: false,
      hideClearAll: false
    }
  });

  expect(screen.getByTestId('header-container')).toBeDefined();
});

test('trigger handleClearAllNotifications', () => {
  const screen = render(HeaderComponent, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      title: 'Sample Header',
      enableClearAll: true,
      handleClearAllNotification: mockClearAllFunction,
      windowViewOnly: false,
      hideClearAll: false
    }
  });
  const clearAllButton = screen.getByTestId('clear-all');

  fireEvent.click(clearAllButton);
  expect(mockClearAllFunction).toHaveBeenCalled();
});

test('should not render clearAll button', () => {
  const screen = render(HeaderComponent, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      title: 'Sample Header',
      enableClearAll: false,
      handleClearAllNotification: mockClearAllFunction,
      windowViewOnly: false,
      hideClearAll: true
    }
  });
  const clearAllButton = getById(screen.container as HTMLElement, 'clear-all');

  expect(clearAllButton).toBeFalsy();
});
