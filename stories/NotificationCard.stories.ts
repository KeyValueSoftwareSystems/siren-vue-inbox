import type { Meta, StoryObj } from '@storybook/vue3';

import { applyTheme } from '../src/utils/commonUtils';
import { ThemeMode } from '../src/utils/constants';
import NotificationCard from '../src/components/NotificationCard.vue';

const meta = {
  title: 'Example/NotificationCard',
  component: NotificationCard,
  tags: ['autodocs'],
  argTypes: {
    cardProps: {
      description: 'Object containing card properties'
    },
    deleteById: {
      description: 'Function triggered when a notification card is deleted'
    },
    onCardClick: {
      description: 'Function triggered when a notification card is clicked'
    },
    notification: {
      description: 'Object containing notification card details'
    },
    styles: {
      description: 'Custom styles to apply to the card component'
    }
  },
  args: {
    cardProps: {
      hideAvatar: false,
      showMedia: false
     },
     deleteById: () => {},
     onCardClick: () => {},
     styles: applyTheme({}, ThemeMode.LIGHT, {}),
     darkMode: false
  }
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleCard: Story = {
  args: {
   notification:
    {
      id: '1',
      createdAt: '2024-04-16T08:16:04.852+00:00',
      message: {
        channel: 'sampleChannel',
        header: 'We have few candles to blow out',
        subHeader: 'Its an exciting news',
        body: 'Exciting news! K Squad Dance Academy is now part of the CoFee app family, thanks to KeyValues fantastic referrals! 🕺💃 Anticipating a wave of referrals from Preschools, dance/music classes, PG/Hostels, and more. Lets keep the rhythm going strong! 🎶🔗 #CoFeemate#CoFeeApp #KeyValueMagic',
        actionUrl: 'sample action',
        avatar: {
          imageUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
          actionUrl: 'sample action'
        },
        additionalData: 'data'
      },
      requestId: 'string',
      isRead: true
    }
  }
};
