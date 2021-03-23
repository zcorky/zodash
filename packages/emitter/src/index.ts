import { IEvent, Event } from '@zodash/event';

export interface IEmitter<Events = any> extends IEvent<Events> {}

export class Emitter<Events = any>
  extends Event<Events>
  implements IEmitter<Events> {}

export default Emitter;
