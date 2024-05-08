import { test, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import { ThemeMode } from '../../src/utils/constants';
import EmptyList from '../../src/components/EmptyList.vue';

test('matches snapshot', () => {
  const wrapper = mount(EmptyList, {
    props: {
      darkMode: true,
      styles: applyTheme({}, ThemeMode.DARK, {})
    }
  });

  expect(wrapper.element).toMatchSnapshot();
});

test('render empty list window with basic content', () => {
  const screen = render(EmptyList, {
    props: { darkMode: true, styles: applyTheme({}, ThemeMode.DARK, {}) }
  });

  expect(screen.getByTestId('empty-container')).toBeDefined();
});
