# `@zodash/worker`

> TODO: description

## Usage

```
import workerize from '@zodash/workerize';

// @1 simple add function
const originalAdd = async (x: number, y: number) => {
  return x + y;
}
// create new add
const add = workerize(originalAdd);
// call as originalAdd do
add(1, 2).then(console.log);


// @2 fetch request
const originalRequest = async (url: string, options?: IRequestOption) => {
  const response = await fetch(url, options);
  
  return response.json();
}
// create new request
const request = workerize(originalRequest);
// call as originalRequest do
request('/api').then(console.log)
```
