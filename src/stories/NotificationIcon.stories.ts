import type { Meta, StoryObj } from '@storybook/vue3';

import { applyTheme } from '../utils/commonUtils';
import { BadgeType, ThemeMode } from '../utils/constants';
import NotificationIcon from '../components/NotificationIcon.vue';

const meta = {
  title: 'Example/NotificationIcon',
  component: NotificationIcon,
  tags: ['autodocs'],
  argTypes: {
    badgeType: {
      description: 'To select the badge type',
      control: { type: 'select' },
      options: BadgeType
    },
    darkMode: {
      description: 'Sets the theme mode for the icon component'
    },
    handleNotification: {
      description: 'Function triggered when the user wants to select icon'
    },
    styles: {
      description: 'Custom styles to apply to the EmptyList component'
    }
  },
  args: {
    badgeType: BadgeType.DEFAULT,
    darkMode: false,
    handleNotification: () => {},
    styles: applyTheme({}, ThemeMode.LIGHT, {})
  }
} satisfies Meta<typeof NotificationIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleIcon: Story = {};
