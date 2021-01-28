import { IProvider, IProviderUser } from './type';
import mailClient from './core';

/**
 * Create Provider
 * 
 * @param provider provider info
 */
export function createProvider(provider: IProvider) {
  /**
   * Create Client Method with user info
   * 
   * @param user provider user
   */
  const createClient = (user: IProviderUser) => {
    return mailClient.create({
      ...provider,
      auth: user,
    });
  };

  return {
    createClient,
  };
}