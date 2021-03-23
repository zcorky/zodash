import { delay } from '@zodash/delay';
import * as c from '../src/cache';

// compose vs pipe

async function fetchUser(token: string) {
  if (token === 'zero_token') {
    return {
      nickname: `zero${Date.now()}`,
    };
  }
}

describe('@zodash/decorator => cache', () => {
  it('cache(key: string, maxAge: number)', async () => {
    class Service {
      ctx = {
        token: 'zero_token',
      };

      @c.cache('ctx.token', 50)
      public async getUser() {
        return fetchUser(this.ctx.token);
      }
    }

    const s = new Service();

    const user1 = await s.getUser();
    const user2 = await s.getUser();
    const user3 = await s.getUser();
    expect(user1).toEqual(user2);
    expect(user1).toEqual(user3);

    await delay(100);
    const user4 = await s.getUser();
    expect(user1).not.toEqual(user4);
  });

  it('cache(maxAge: number)', async () => {
    class Service {
      @c.cache(50)
      public async getUser(token: string) {
        return fetchUser(token);
      }
    }

    const s = new Service();

    const token = 'zero_token';
    const user1 = await s.getUser(token);
    const user2 = await s.getUser(token);
    const user3 = await s.getUser(token);
    expect(user1).toEqual(user2);
    expect(user1).toEqual(user3);

    await delay(100);
    const user4 = await s.getUser(token);
    expect(user1).not.toEqual(user4);
  });

  it('cache(key: () => string, maxAge: number)', async () => {
    class Service {
      ctx = {
        token: 'zero_token',
      };

      @c.cache(function () {
        return this.ctx.token;
      }, 50)
      public async getUser() {
        return fetchUser(this.ctx.token);
      }
    }

    const s = new Service();

    const user1 = await s.getUser();
    const user2 = await s.getUser();
    const user3 = await s.getUser();
    expect(user1).toEqual(user2);
    expect(user1).toEqual(user3);

    await delay(100);
    const user4 = await s.getUser();
    expect(user1).not.toEqual(user4);
  });
});
