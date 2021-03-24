import container, { Provider, Inject } from '../src';

describe('@zodash/inversify', () => {
  it('works', async () => {
    @Provider('componentA', ['zero'])
    class ComponentA {
      constructor(private readonly name: string) {}

      public status() {
        return `${this.name} is ready.`;
      }
    }

    @Provider('componentB')
    class ComponentB {
      @Inject('componentA')
      private component!: ComponentA;

      public run() {
        return this.component.status();
      }
    }

    @Provider('app')
    class App {
      @Inject()
      componentA!: ComponentA;

      @Inject()
      componentB!: ComponentB;

      run() {
        return this.componentB.run();
      }
    }

    container.load([App, ComponentA, ComponentB]);

    function bootstrap() {
      const app = container.get('app') as any;

      expect(app.run()).toBe('zero is ready.');
    }

    bootstrap();
  });
});
