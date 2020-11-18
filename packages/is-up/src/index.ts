import axios from 'axios';

export async function isUp(url: string) {
  const { status } = await axios.get(url, {
    headers: {
      'user-agent': 'is-up/1.0 (whatwewant; @zodash/is-up)',
    },
  });

  return status === 200;
}

export default isUp;
