import { Event } from '@zodash/event';

export interface TrackingEvent {
  tracking<T = any>(type: string, payload: T): void;
}

const event = new Event<TrackingEvent>();

export function registryTrackingMonitor<T = any>(
  eventType: string,
  handler: (eventPayload: T) => void,
): void;
export function registryTrackingMonitor(
  events: Record<string, <T = any>(eventPayload: T) => void>,
): void;
export function registryTrackingMonitor(param0: any, param1?: any) {
  if (typeof param0 === 'string') {
    return event.on('tracking', (_eventType: string, _eventPayload: any) => {
      if (param0 === _eventType) {
        param1.apply(null, [_eventPayload]);
      }
    });
  }

  const indexedEvents = Object.keys(param0).reduce(
    (all, key) => ((all[key] = true), all),
    {} as Record<string, boolean>,
  );

  return event.on('tracking', (_eventType: string, _eventPayload: any) => {
    if (_eventType in indexedEvents) {
      const handler = param0[_eventType];
      handler.apply(null, [_eventPayload]);
    }
  });
}

export function track<T = any>(eventType: string, eventPayload: T) {
  event.emit('tracking', eventType, eventPayload);
}

export default {
  registryTrackingMonitor,
  track,
};
