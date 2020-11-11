const observers = new WeakMap();
const queuedObservers = new Set();

let currentObserver: Function;

/**
 * Make Data Observerable
 * 
 * @param object orignal data
 */
export function observerable<T extends object>(object: T) {
  observers.set(object, new Map());

  return new Proxy(object, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      if (currentObserver) {
        registerObserver(target, key, currentObserver);

        if (typeof result === 'object') {
          const observerableRes = observerable(result);
          Reflect.set(target, key, observerableRes, receiver);
          return observerableRes;
        }
      }

      return result;
    },
    set(target, key, value, receiver) {
      const observersForKey = observers.get(target).get(key);
      if (observersForKey) {
        observersForKey.forEach(queueObserver);
      }

      return Reflect.set(target, key, value, receiver);
    },
  });
}

/**
 * Make Observer which using observerable data
 *  run observer to get dependencies 
 * 
 * @param observer observer function
 */
export function observe(observer: Function) {
  queueObserver(observer);
}

export default {
  observerable,
  observe,
};

function queueObserver(observer: Function) {
  if (queuedObservers.size === 0) {
    // 执行一遍，依赖手机，并且注册观察者
    Promise.resolve().then(runObservers);
  }

  queuedObservers.add(observer);
}

function runObservers() {
  try {
    queuedObservers.forEach(runObserver);
  } finally {
    currentObserver = undefined;
    queuedObservers.clear();
  }
}

function runObserver(observer: Function) {
  currentObserver = observer;
  observer();
}

function registerObserver<T extends object>(target: T, key: any, observer) {
  let observersForKey = observers.get(target).get(key);
  if (!observersForKey) {
    observersForKey = new Set();
    observers.get(target).set(key, observersForKey);
  }

  observersForKey.add(observer);
}