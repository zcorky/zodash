# `@zodash/retry`

> Retry a promise-returning or async function

## Usage

```
import { retry } from '@zodash/retry';
import * as fetch from 'node-fetch';

const run = async () => {
	const response = await fetch('https://sindresorhus.com/unicorn');

	// Abort retrying if the resource doesn't exist
	if (response.status === 404) {
		throw new Error(response.statusText);
	}

	return response.blob();
};

(async () => {
	console.log(await retry(run, {retries: 5}));
})();
```
