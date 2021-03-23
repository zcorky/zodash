import { Event } from '../src';

describe('event', () => {
  const eventPoll = new Event();
  const eventName = 'count';

  afterEach(() => {
    eventPoll.removeAllListeners(eventName);
  });

  it('on/emit', () => {
    const datahub = [];

    eventPoll.on(eventName, (v) => {
      datahub.push(v);
    });

    expect(datahub).toEqual([]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1]);
    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1, 1]);
    eventPoll.emit(eventName, 2);
    expect(datahub).toEqual([1, 1, 2]);
  });

  it('once/emit', () => {
    const datahub = [];

    expect(eventPoll.listeners[eventName]).toBeUndefined();
    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([]);

    eventPoll.once(eventName, (v) => {
      datahub.push(v);
    });

    expect(datahub).toEqual([]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1]);
    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1]);
    eventPoll.emit(eventName, 2);
    expect(datahub).toEqual([1]);
  });

  it('off', () => {
    const datahub = [];
    const listenr = (v: number) => {
      datahub.push(v);
    };

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([]);

    eventPoll.on(eventName, listenr);

    expect(datahub).toEqual([]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1, 1]);

    eventPoll.off(eventName, listenr);
    eventPoll.emit(eventName, 2);
    expect(datahub).toEqual([1, 1]);
  });

  it('addListener', () => {
    const datahub = [];

    eventPoll.addListener(eventName, (v) => {
      datahub.push(v);
    });

    expect(datahub).toEqual([]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1]);
    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1, 1]);
    eventPoll.emit(eventName, 2);
    expect(datahub).toEqual([1, 1, 2]);
  });

  it('removeListener', () => {
    const datahub = [];
    const listenr = (v: number) => {
      datahub.push(v);
    };

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([]);

    eventPoll.addListener(eventName, listenr);

    expect(datahub).toEqual([]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1]);

    eventPoll.emit(eventName, 1);
    expect(datahub).toEqual([1, 1]);

    eventPoll.removeListener(eventName, listenr);
    eventPoll.emit(eventName, 2);
    expect(datahub).toEqual([1, 1]);
  });

  it('multiple event', () => {
    const datahub = [];
    let count = 0;
    const anotherEvent = 'message';
    const listener = (v) => {
      datahub.push(v);
    };

    eventPoll.off(anotherEvent, listener);
    eventPoll.on(anotherEvent, listener);

    eventPoll.on(anotherEvent, () => {
      count += 1;
    });

    expect(datahub).toEqual([]);

    eventPoll.emit(anotherEvent, 1);
    expect(datahub).toEqual([1]);
    expect(count).toEqual(1);

    eventPoll.emit(anotherEvent, 1);
    expect(datahub).toEqual([1, 1]);
    expect(count).toEqual(2);

    eventPoll.emit(anotherEvent, 2);
    expect(datahub).toEqual([1, 1, 2]);
    expect(count).toEqual(3);

    eventPoll.off(anotherEvent, listener);

    eventPoll.emit(anotherEvent, 2);
    expect(datahub).toEqual([1, 1, 2]);
    expect(count).toEqual(4);
  });
});
