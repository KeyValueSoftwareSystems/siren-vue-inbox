import type { Meta, StoryObj } from '@storybook/vue3';

import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';
import LoaderComponent from '../src/components/LoaderComponent.vue';

const meta = {
  title: 'Example/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  argTypes: {
    styles: {
      description: 'Custom styles to apply to the Loader component'
    }
  },
  args: {
    hideAvatar: false
  }
} satisfies Meta<typeof LoaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleLoader: Story = {
  args: {
    styles: applyTheme({}, ThemeMode.LIGHT, {})
  }
};
