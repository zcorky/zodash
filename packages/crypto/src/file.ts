import * as fs from 'fs';
import * as crypto from 'crypto';

const DEFAULT_ENCODING = 'base64';

export function signature(
  algorithm: 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512',
  pathOrStream: string | fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream =
      typeof pathOrStream !== 'string'
        ? pathOrStream
        : fs.createReadStream(pathOrStream);

    stream.on('error', reject);

    stream.on('end', () => resolve(hash.digest(encoding || DEFAULT_ENCODING)));

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
  });
}

export function md5(
  path: string,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function md5(
  stream: fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function md5(
  pathOrStream: string | fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return signature('md5', pathOrStream, encoding);
}

export function sha1(
  path: string,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha1(
  stream: fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha1(
  pathOrStream: string | fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return signature('sha1', pathOrStream, encoding);
}

export function sha256(
  path: string,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha256(
  stream: fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha256(
  pathOrStream: string | fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return signature('sha256', pathOrStream, encoding);
}

export function sha384(
  path: string,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha384(
  stream: fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha384(
  pathOrStream: string | fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return signature('sha384', pathOrStream, encoding);
}

export function sha512(
  path: string,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha512(
  stream: fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
): Promise<string>;
export function sha512(
  pathOrStream: string | fs.ReadStream,
  encoding?: crypto.HexBase64Latin1Encoding
) {
  return signature('sha512', pathOrStream, encoding);
}
