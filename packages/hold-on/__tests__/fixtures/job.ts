import holdOn from '../../src';

setTimeout(() => {
  console.log('hi');
}, 1000);

// if no here, it will exit when timeout
holdOn('/tmp/xxx.sock');
