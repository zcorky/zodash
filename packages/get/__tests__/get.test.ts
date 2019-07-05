import { deepEqual } from '@zcorky/deep-equal';
import { get as lget } from 'lodash';

import { get } from '../src/get';

describe('@zodash/get', () => {
    it('same as lodash', () => {
        const object = { a: { b: [{ c: { d: 1, e: false } }] } };

        const v1 = lget(object, 'a.b[0].c.d');
        const v2 = get(object, 'a.b.0.c.d');

        const v3 = lget(object, 'a.c[0].c.d', null);
        const v4 = get(object, 'a.c.0.c.d', null);

        const v5 = lget(object, 'a.c.0.c.d.e');
        const v6 = get(object, 'a.c.0.c.d.e') as any;

        expect(deepEqual(v1, v2 as any)).toBeTruthy();
        expect(deepEqual(v3, v4)).toBeTruthy();
        expect(deepEqual(v5, v6)).toBeTruthy();
    });

    it('array a.b.0.d', () => {
        const object = { a: { b: [{ c: { d: 1, e: false } }] } };

        const v1 = lget(object, 'a.b.0.c.d');
        const v2 = get(object, 'a.b.0.c.d');

        expect(deepEqual(v1, v2 as any)).toBeTruthy();
    });

    it('array a.b[0].d', () => {
        const object = { a: { b: [{ c: { d: 1, e: false } }] } };

        const v1 = lget(object, 'a.b[0].c.d');
        const v2 = get(object, 'a.b[0].c.d');

        expect(deepEqual(v1, v2 as any)).toBeTruthy();
    });
});
