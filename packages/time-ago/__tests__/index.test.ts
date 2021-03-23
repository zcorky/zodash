import { timeAgo } from '../src';

describe('@zodash/time-ago', () => {
  it('Date', () => {
    const now = new Date();
    expect(timeAgo(now.getTime() - 800, { now })).toEqual('just now');
    expect(timeAgo(now.getTime() - 8000, { now })).toEqual('8 seconds ago');
    expect(timeAgo(now.getTime() - 8 * 60 * 1000, { now })).toEqual(
      '8 minutes ago',
    );
    expect(timeAgo(now.getTime() - 8 * 60 * 60 * 1000, { now })).toEqual(
      '8 hours ago',
    );
    expect(timeAgo(now.getTime() - 5 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '5 days ago',
    );
    expect(timeAgo(now.getTime() - 8 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '1 weeks ago',
    );
    expect(timeAgo(now.getTime() - 30 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '1 months ago',
    );
    expect(timeAgo(now.getTime() - 365 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '1 years ago',
    );
    expect(
      timeAgo(now.getTime() - 10 * 365 * 24 * 60 * 60 * 1000, { now }),
    ).toEqual('10 years ago');
  });

  it('number', () => {
    const now = new Date().getTime();
    expect(timeAgo(now - 800, { now })).toEqual('just now');
    expect(timeAgo(now - 8000, { now })).toEqual('8 seconds ago');
    expect(timeAgo(now - 8 * 60 * 1000, { now })).toEqual('8 minutes ago');
    expect(timeAgo(now - 8 * 60 * 60 * 1000, { now })).toEqual('8 hours ago');
    expect(timeAgo(now - 5 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '5 days ago',
    );
    expect(timeAgo(now - 8 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '1 weeks ago',
    );
    expect(timeAgo(now - 30 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '1 months ago',
    );
    expect(timeAgo(now - 365 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '1 years ago',
    );
    expect(timeAgo(now - 10 * 365 * 24 * 60 * 60 * 1000, { now })).toEqual(
      '10 years ago',
    );
  });

  it('date', () => {
    const now = new Date().getTime();
    expect(timeAgo(new Date(now - 800), { now: new Date(now) })).toEqual(
      'just now',
    );
    expect(timeAgo(new Date(now - 8000), { now: new Date(now) })).toEqual(
      '8 seconds ago',
    );
    expect(
      timeAgo(new Date(now - 8 * 60 * 1000), { now: new Date(now) }),
    ).toEqual('8 minutes ago');
    expect(
      timeAgo(new Date(now - 8 * 60 * 60 * 1000), { now: new Date(now) }),
    ).toEqual('8 hours ago');
    expect(
      timeAgo(new Date(now - 5 * 24 * 60 * 60 * 1000), { now: new Date(now) }),
    ).toEqual('5 days ago');
    expect(
      timeAgo(new Date(now - 8 * 24 * 60 * 60 * 1000), { now: new Date(now) }),
    ).toEqual('1 weeks ago');
    expect(
      timeAgo(new Date(now - 30 * 24 * 60 * 60 * 1000), { now: new Date(now) }),
    ).toEqual('1 months ago');
    expect(
      timeAgo(new Date(now - 365 * 24 * 60 * 60 * 1000), { now: new Date(now) }),
    ).toEqual('1 years ago');
    expect(
      timeAgo(new Date(now - 10 * 365 * 24 * 60 * 60 * 1000), {
        now: new Date(now),
      }),
    ).toEqual('10 years ago');
  });

  it('i18n: set zh-CN', () => {
    const now = new Date().getTime();
    expect(timeAgo(now - 800, { now, language: 'zh-CN' })).toEqual('刚刚');
    expect(timeAgo(now - 8000, { now, language: 'zh-CN' })).toEqual('8秒前');
    expect(timeAgo(now - 8 * 60 * 1000, { now, language: 'zh-CN' })).toEqual(
      '8分钟前',
    );
    expect(
      timeAgo(now - 8 * 60 * 60 * 1000, { now, language: 'zh-CN' }),
    ).toEqual('8小时前');
    expect(
      timeAgo(now - 5 * 24 * 60 * 60 * 1000, { now, language: 'zh-CN' }),
    ).toEqual('5天前');
    expect(
      timeAgo(now - 8 * 24 * 60 * 60 * 1000, { now, language: 'zh-CN' }),
    ).toEqual('1周前');
    expect(
      timeAgo(now - 30 * 24 * 60 * 60 * 1000, { now, language: 'zh-CN' }),
    ).toEqual('1个月前');
    expect(
      timeAgo(now - 365 * 24 * 60 * 60 * 1000, { now, language: 'zh-CN' }),
    ).toEqual('1年前');
    expect(
      timeAgo(now - 10 * 365 * 24 * 60 * 60 * 1000, { now, language: 'zh-CN' }),
    ).toEqual('10年前');
  });
});
