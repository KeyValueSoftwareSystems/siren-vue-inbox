import { test, expect, vitest } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import { applyTheme } from '../../src/utils/commonUtils';
import { ThemeMode } from '../../src/utils/constants';
import LoadMore from '../../src/components/LoadMore.vue';

const mockLoadMoreFunction = vitest.fn();

test('matches snapshot', () => {
  const wrapper = mount(LoadMore, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      onLoadMore: mockLoadMoreFunction,
      paginationLoading: false
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test('render load more component with basic content', () => {
  const screen = render(LoadMore, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      onLoadMore: mockLoadMoreFunction,
      paginationLoading: false
    }
  });

  expect(screen.getByTestId('load-more-container')).toBeDefined();
});

test('trigger onLoadMore', () => {
  const screen = render(LoadMore, {
    props: {
      styles: applyTheme({}, ThemeMode.DARK, {}),
      onLoadMore: mockLoadMoreFunction,
      paginationLoading: false
    }
  });
  const loadMoreButton = screen.getByTestId('on-load-more');

  fireEvent.click(loadMoreButton);
  expect(mockLoadMoreFunction).toHaveBeenCalled();
});
