import { IEvent, Event } from '@zodash/event';

export interface IIEvent extends IEvent {
  Event: typeof Event;
}

const event = new Event() as any as IIEvent;

event.Event = Event;

export default event;
