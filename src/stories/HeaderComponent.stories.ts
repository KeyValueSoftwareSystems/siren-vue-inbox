import type { Meta, StoryObj } from '@storybook/vue3';

import { applyTheme } from '../utils/commonUtils';
import { ThemeMode } from '../utils/constants';
import HeaderComponent from '../components/HeaderComponent.vue';

const meta = {
  title: 'Example/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    enableClearAll: {
      description: 'Enable clear all button in Header'
    },
    title: {
      description: 'Sets the title in Header'
    },
    windowViewOnly: {
      description: 'Show header component for window only view'
    },
    handleClearAllNotification: {
      description: 'Function triggered when the user wants to clear all notifications'
    },
    hideClearAll: {
      description: 'To hide clear all option'
    },
    styles: {
      description: 'Custom styles to apply to the Header component'
    }
  },
  args: {
    enableClearAll: true,
    windowViewOnly: false,
    hideClearAll: false,
    handleClearAllNotification: () => {},
    styles: applyTheme({}, ThemeMode.LIGHT, {})
  }
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleHeaderComponent: Story = {
  args: {
    title: 'Sample Header'
  }
};
