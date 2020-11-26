import { IEvent, Event } from '@zodash/event';

export interface IEmitter extends IEvent {

}

export class Emitter extends Event implements IEmitter {
  
}

export default Emitter;
