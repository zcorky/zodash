import { uuid, UUID_V4_PATTERN } from '../src/uuid';

describe('@zodash/uuid', () => {
  it('works', () => {
    expect(uuid()).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/,
    );
  });
});
