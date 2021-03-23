import { IEvent, Event } from '@zodash/event';

export type IEmitter<Events = any> = IEvent<Events>

export class Emitter<Events = any>
  extends Event<Events>
  implements IEmitter<Events> {}

export default Emitter;
