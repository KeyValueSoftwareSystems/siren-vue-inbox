import type { Meta, StoryObj } from '@storybook/vue3';

import { applyTheme } from '../utils/commonUtils';
import { ThemeMode } from '../utils/constants';
import EmptyList from '../components/EmptyList.vue';

const meta = {
  title: 'Example/EmptyList',
  component: EmptyList,
  tags: ['autodocs'],
  argTypes: {
    darkMode: {
      description: 'Sets the theme mode for the EmptyList component'
    },
    styles: {
      description: 'Custom styles to apply to the EmptyList component'
    }
  },
  args: {
    darkMode: false,
    styles: applyTheme({}, ThemeMode.LIGHT, {})
  }
} satisfies Meta<typeof EmptyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleEmptyList: Story = {
  args: {
    darkMode: false
  }
};
