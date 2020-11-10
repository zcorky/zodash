# `@zodash/worker`

> TODO: description

## Usage

```
import worker from '@zodash/worker';

// @1 simple add function
const originalAdd = async (x: number, y: number) => {
  return x + y;
}
// create new add
const add = worker.create(originalAdd);
// call as originalAdd do
add(1, 2).then(console.log);


// @2 fetch request
const originalRequest = async (url: string, options?: IRequestOption) => {
  const response = await fetch(url, options);
  
  return response.json();
}
// create new request
const request = worker.create(originalRequest);
// call as originalRequest do
request('/api').then(console.log)
```
