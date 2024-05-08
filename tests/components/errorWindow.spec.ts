import { test, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import { ThemeMode } from '../../src/utils/constants';
import ErrorWindow from '../../src/components/ErrorWindow.vue';

test('matches snapshot', () => {
  const wrapper = mount(ErrorWindow, {
    props: {
      error: '',
      darkMode: true,
      styles: applyTheme({}, ThemeMode.DARK, {})
    }
  });

  expect(wrapper.element).toMatchSnapshot();
});

test('render error window with basic content', () => {
  const screen = render(ErrorWindow, {
    props: { error: '', darkMode: true, styles: applyTheme({}, ThemeMode.DARK, {}) }
  });

  expect(screen.getByTestId('error-window')).toBeDefined();
});
