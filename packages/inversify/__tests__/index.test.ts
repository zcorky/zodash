import container, { Provider, Inject } from '../src';

describe('@zodash/inversify', () => {
  it('works', async () => {
    
    @Provider('component', ['zero'])
    class Component {
      constructor(private readonly name: string) {}

      public status() {
        return `${this.name} is ready.`;
      }
    }

    @Provider('app')
    class App {

      @Inject()
      private component: Component;

      public run() {
        return this.component.status();
      }
    }

    container.load([
      App,
      Component,
    ]);

    const app = container.get('app') as any;

    expect(app.run()).toBe('zero is ready.');
  });

});
