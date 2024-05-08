import type { Siren } from 'test_notification';
import type { Ref } from 'vue';
import { inject } from 'vue';
import PubSub from 'pubsub-js';

import { errorMap, eventTypes, events } from '../utils/constants';

const useSiren = () => {
  const siren: Ref<Siren> = inject('siren') as Ref<Siren>;

  const markAsReadById = async (id: string) => {
    if (siren.value)
      if (id?.length > 0) {
        const response = await siren.value?.markAsReadById(id);

        if (response && response.data) {
          const payload = { id, action: eventTypes.MARK_ITEM_AS_READ };

          PubSub.publish(
            events.NOTIFICATION_LIST_EVENT,
            JSON.stringify(payload)
          );
        }

        return response;
      } else {
        return { error: errorMap.MISSING_PARAMETER };
      }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const markAsReadByDate = async (untilDate: string) => {
    if (siren.value && untilDate) {
      const response = await siren.value?.markAsReadByDate(untilDate);

      if (response && response.data) {
        const payload = { action: eventTypes.MARK_ALL_AS_READ };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const deleteById = async (id: string, shouldUpdateList: boolean = true) => {
    if (siren.value)
      if (id?.length > 0) {
        const response = await siren.value?.deleteById(id);

        if (response && response.data && shouldUpdateList) {
          const payload = { id, action: eventTypes.DELETE_ITEM };

          PubSub.publish(
            events.NOTIFICATION_LIST_EVENT,
            JSON.stringify(payload)
          );
        }

        return response;
      } else {
        return { error: errorMap.MISSING_PARAMETER };
      }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const deleteByDate = async (untilDate: string) => {
    if (siren.value && untilDate) {
      const response = await siren.value?.deleteByDate(untilDate);

      if (response && response.data) {
        const payload = { action: eventTypes.DELETE_ALL_ITEM };

        PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  const markAllAsViewed = async (untilDate: string) => {
    if (siren.value && untilDate) {
      const response = await siren.value?.markAllAsViewed(untilDate);

      if (response && response.data) {
        const payload = {
          notificationsCount: 0,
          action: eventTypes.UPDATE_NOTIFICATIONS_COUNT
        };

        PubSub.publish(
          events.NOTIFICATION_COUNT_EVENT,
          JSON.stringify(payload)
        );
      }

      return response;
    }

    return { error: errorMap.SIREN_OBJECT_NOT_FOUND };
  };

  return {
    markAsReadByDate,
    markAsReadById,
    deleteById,
    deleteByDate,
    markAllAsViewed
  };
};

export default useSiren;
