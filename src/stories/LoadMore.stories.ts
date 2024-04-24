import type { Meta, StoryObj } from '@storybook/vue3';

import { applyTheme } from '../utils/commonUtils';
import { ThemeMode } from '../utils/constants';
import LoadMore from '../components/LoadMore.vue';

const meta = {
  title: 'Example/LoadMore',
  component: LoadMore,
  tags: ['autodocs'],
  argTypes: {
    onLoadMore: {
      description: 'Function triggered when the user wants to load more notifications'
    },
    paginationLoading: {
      description: 'Shows if notifications are loading'
    },
    styles: {
      description: 'Custom styles to apply to the LoadMore component'
    }
  },
  args: {
    onLoadMore: () => {},
    styles: applyTheme({}, ThemeMode.LIGHT, {})
  }
} satisfies Meta<typeof LoadMore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleLoadMore: Story = {
  args: {
   paginationLoading: false
  }
};

export const SampleLoading: Story = {
  args: {
   paginationLoading: true
  }
};
