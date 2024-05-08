import { test, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import { ThemeMode } from '../../src/utils/constants';
import LoaderComponent from '../../src/components/LoaderComponent.vue';

test('matches snapshot', () => {
  const wrapper = mount(LoaderComponent, {
    props: {
      hideAvatar: false,
      styles: applyTheme({}, ThemeMode.DARK, {})
    }
  });

  expect(wrapper.element).toMatchSnapshot();
});

test('render loader component with basic content', () => {
  const screen = render(LoaderComponent, {
    props: { hideAvatar: false, styles: applyTheme({}, ThemeMode.DARK, {}) }
  });

  expect(screen.getByTestId('loader-container')).toBeDefined();
});
