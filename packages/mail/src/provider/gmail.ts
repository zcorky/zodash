import { createProvider } from '../utils';

/**
 * Gmail
 */
export default createProvider({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
});
