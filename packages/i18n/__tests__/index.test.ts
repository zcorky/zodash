import i18n, { t } from '../src';

const zh_CN = require('./fixtures/zh_CN.json');
const en_US = require('./fixtures/en_US.json');

describe('@zodash/i18n', () => {
  it('works', async () => {
    i18n.config({
      locales: {
        zh_CN,
        en_US,
      }
    });

    expect(t('hello')).toBe('你好');
    expect(t('feedback.success')).toBe('连接成功');
    expect(t('feedback.error')).toBe('连接失败');
    expect(t('feedback.error.unknown.x')).toBe('feedback.error.unknown.x');

    expect(i18n.t('hello')).toBe('你好');
    expect(i18n.t('feedback.success')).toBe('连接成功');
    expect(i18n.t('feedback.error')).toBe('连接失败');
    expect(i18n.t('feedback.error.unknown.x')).toBe('feedback.error.unknown.x');


    i18n.setLocale('zh_CN');
    expect(t('hello')).toBe('你好');
    expect(t('feedback.success')).toBe('连接成功');
    expect(t('feedback.error')).toBe('连接失败');
    expect(t('feedback.error.unknown.x')).toBe('feedback.error.unknown.x');

    i18n.setLocale('en_US');
    expect(t('hello')).toBe('hello');
    expect(t('feedback.success')).toBe('connection succeeded');
    expect(t('feedback.error')).toBe('connection failed');
    expect(t('feedback.error.unknown.x')).toBe('feedback.error.unknown.x');
  });

  it('setLocales', async () => {
    i18n.setLocales({
      zh_CN,
      en_US,
    });

    i18n.setLocale('zh_CN');
    expect(t('hello')).toBe('你好');
    expect(t('feedback.success')).toBe('连接成功');
    expect(t('feedback.error')).toBe('连接失败');
    expect(t('feedback.error.unknown.x')).toBe('feedback.error.unknown.x');

    i18n.setLocale('en_US');
    expect(t('hello')).toBe('hello');
    expect(t('feedback.success')).toBe('connection succeeded');
    expect(t('feedback.error')).toBe('connection failed');
    expect(t('feedback.error.unknown.x')).toBe('feedback.error.unknown.x');
  });

  it('support format', async () => {
    i18n.setLocales({
      zh_CN,
      en_US,
    });

    i18n.setLocale('zh_CN');
    expect(t('feedback.shouldformat')).toBe('你好, ');
    expect(t('feedback.shouldformat', { name: 'zero' })).toBe('你好, zero');
  });
});
