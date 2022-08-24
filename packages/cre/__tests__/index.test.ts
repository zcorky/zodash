import CRE from '../src';

describe('@zodash/Container', () => {
  it('works', async () => {
    for (const name in CRE) {
      const re = new RegExp(CRE[name].rule.source, CRE[name].rule.flags);
      const testcases = CRE[name].examples;

      for (const testcase of testcases) {
        const isMatched = re.test(testcase);
        if (!isMatched) {
          console.log(
            'testcase not matched:',
            name,
            CRE[name].rule,
            testcase,
          );
        }

        expect(isMatched).toBeTruthy();
      }
    }
  });
});
