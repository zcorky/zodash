import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { getUserAgent } from './get-user-agent';

export async function request(input: RequestInfo, options: RequestInit) {
  const userAgent = getUserAgent();

  return fetch(input, {
    method: options.method,
    headers: {
      ...options.headers,
      'user-agent': userAgent,
    },
    body: options.body,
    redirect: options.redirect,
  });
}

export function createServerRequest() {

}

export function createClientRequest() {

}