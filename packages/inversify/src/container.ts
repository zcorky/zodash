import { CLASS_KEY } from './decorators/provider';
import { PROPS_KEY } from './decorators/inject';

export class Container {
  static _instance: Container;
  private store = new Map();

  static create() {
    if (!Container._instance) {
      Container._instance = new Container();
    }

    return Container._instance;
  }

  register(identifier: string, clazz: any, constructorArgs: any[]) {
    this.store.set(identifier, {
      clazz,
      constructorArgs,
    });
  }

  get<T>(serviceName: string): T {
    const target = this.store.get(serviceName);
    // console.log('target:', serviceName, target);
    const { clazz, constructorArgs } = target;

    const props = Reflect.getMetadata(PROPS_KEY, clazz);
    const instance = Reflect.construct(clazz, constructorArgs);

    for (let prop in props) {
      const serviceName = props[prop].value;

      // inject instance
      instance[prop] = this.get(serviceName);
    }

    return instance;
  }

  // register all
  load(modules: any[]) {
    for (const module of modules) {
      const metadata = Reflect.getMetadata(CLASS_KEY, module);

      if (metadata) {
        this.register(metadata.id, module, metadata.args);
      }
    }
  }
}

