import { Suite } from 'benchmark';
import { v4, v1 } from 'node-uuid';
import { uuid } from '../src/uuid';

const suite = new Suite();

// add tests
suite
  .add('uuid', function () {
    return uuid();
  })
  .add('node-uuid/v4', function () {
    return v4();
  })
  .add('node-uuid/v1', function () {
    return v1();
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
