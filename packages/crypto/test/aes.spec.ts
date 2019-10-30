import * as CryptoJS from 'crypto-js';

import { encrypt, decrypt } from '../src/aes';

describe('sha512', () => {
  it('hello world', () => {
    const algorithm = 'aes-128-cbc';
    const key = '9cd5b4cf89949207';
    const iv = 'e6db271db12d4d47';
    const text = 'test';

    const encrypted = encrypt(algorithm, key, iv, text);
    const decrypted = decrypt(algorithm, key, iv, encrypted);
    expect(encrypted).toBe('9+tqKyzJLeWl7TpFykbSSQ==');
    expect(decrypted).toBe(text);
  });

  it('same as crypto-js', () => {
    const algorithm = 'aes-128-cbc';
    const key = '9cd5b4cf89949207';
    const iv = 'e6db271db12d4d47';
    const text = 'test';

    const encrypted = encrypt(algorithm, key, iv, text);
    const _encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
      }
    ).toString();

      expect(encrypted).toEqual(_encrypted);
  });

  it('aes-128-cbc', () => {
    const algorithm = 'aes-128-cbc';
    const key = Buffer.alloc(8).toString('hex');
    const iv = Buffer.alloc(8).toString('hex');
    const text = 'test';

    const encrypted = encrypt(algorithm, key, iv, text);
    const _encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
      }
    ).toString();

      expect(encrypted).toEqual(_encrypted);
  });

  it('aes-192-cbc', () => {
    const algorithm = 'aes-192-cbc';
    const key = Buffer.alloc(12).toString('hex');
    const iv = Buffer.alloc(8).toString('hex');
    const text = 'test';

    const encrypted = encrypt(algorithm, key, iv, text);
    const _encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
      }
    ).toString();

      expect(encrypted).toEqual(_encrypted);
  });

  it('aes-256-cbc', () => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.alloc(16).toString('hex');
    const iv = Buffer.alloc(8).toString('hex');
    const text = 'test';

    const encrypted = encrypt(algorithm, key, iv, text);
    const _encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();

      expect(encrypted).toEqual(_encrypted);
  });

  it('aes-128/192/256-cfb', () => {
    const aes128cfb = () => {
      const algorithm = 'aes-128-cfb';
      const key = Buffer.alloc(8).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes192cfb = () => {
      const algorithm = 'aes-192-cfb';
      const key = Buffer.alloc(12).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes256cfb = () => {
      const algorithm = 'aes-256-cfb';
      const key = Buffer.alloc(16).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    aes128cfb();
    aes192cfb();
    aes256cfb();
  });

  it('aes-128/192/256-ctr', () => {
    const aes128ctr = () => {
      const algorithm = 'aes-128-ctr';
      const key = Buffer.alloc(8).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes192ctr = () => {
      const algorithm = 'aes-192-ctr';
      const key = Buffer.alloc(12).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes256ctr = () => {
      const algorithm = 'aes-256-ctr';
      const key = Buffer.alloc(16).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    aes128ctr();
    aes192ctr();
    aes256ctr();
  });

  it('aes-128/192/256-ecb', () => {
    const aes128ecb = () => {
      const algorithm = 'aes-128-ecb';
      const key = Buffer.alloc(8).toString('hex');
      const iv = Buffer.alloc(0).toString('hex'); // Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.ECB,
          // padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes192ecb = () => {
      const algorithm = 'aes-192-ecb';
      const key = Buffer.alloc(12).toString('hex');
      const iv = Buffer.alloc(0).toString('hex'); // Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.ECB,
          // padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes256ecb = () => {
      const algorithm = 'aes-256-ecb';
      const key = Buffer.alloc(16).toString('hex');
      const iv = Buffer.alloc(0).toString('hex'); // Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.ECB,
          // padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    aes128ecb();
    aes192ecb();
    aes256ecb();
  });

  it('aes-128/192/256-ofb', () => {
    const aes128ofb = () => {
      const algorithm = 'aes-128-ofb';
      const key = Buffer.alloc(8).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.OFB,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes192ofb = () => {
      const algorithm = 'aes-192-ofb';
      const key = Buffer.alloc(12).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.OFB,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    const aes256ofb = () => {
      const algorithm = 'aes-256-ofb';
      const key = Buffer.alloc(16).toString('hex');
      const iv = Buffer.alloc(8).toString('hex');
      const text = 'test';

      const encrypted = encrypt(algorithm, key, iv, text);
      const _encrypted = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.OFB,
          padding: CryptoJS.pad.NoPadding,
        }
      ).toString();

      expect(encrypted).toEqual(_encrypted);
    };

    aes128ofb();
    aes192ofb();
    aes256ofb();
  });
})

describe('aes => crypto-js.aes', () => {
  const data = JSON.stringify({ id: 'c01', username: 'zero' });
  const key = '1234123412ABCDEF';
  const iv = 'ABCDEF1234123412';

  it('encrypt', () => {
    const a = encrypt('aes-128-cbc', key, iv, data);
    const c = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(iv),
    }).toString();

    expect(a).toEqual(c);
  });

  it('encrypt', () => {
    const a = encrypt('aes-128-cbc', key, iv, data);
    const c = CryptoJS.AES.decrypt(a, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(iv),
    }).toString(CryptoJS.enc.Utf8);

    expect(c).toEqual(data);
  });
});