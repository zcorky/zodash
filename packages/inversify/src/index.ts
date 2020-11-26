import { Container } from './container';
import { Provider } from './decorators/provider';
import { Inject } from './decorators/inject';

export {
  Container,
  Provider,
  Inject,
};

export const container = Container.create();

export default container;
