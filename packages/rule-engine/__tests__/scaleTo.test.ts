import engine, { IRuleNode } from '../src/core/sync';

describe('@zodash/rule-engine', () => {
  it('run', () => {
    type DataSource = {
      name: string;
      age: number;
      ageUnder10Field: boolean;
      ageBetween10And18Field: boolean;
      ageOver18Field: boolean;
    };

    const rules: IRuleNode<DataSource>[] = [
      {
        type: 'Attr',
        value: 'name',
      },
      {
        type: 'Attr',
        value: 'age',
        onScaleTo(d) {
          if (d.age < 10) {
            return 'ageUnder10';
          } else if (d.age < 18) {
            return 'ageBetween10And18';
          } else {
            return 'ageOver18';
          }
        },
        children: [
          {
            type: 'Value',
            value: 'ageUnder10',
            children: [
              { type: 'Attr', value: 'ageUnder10Field' },
            ],
          },
          {
            type: 'Value',
            value: 'ageBetween10And18',
            children: [
              { type: 'Attr', value: 'ageBetween10And18Field' },
            ],
          },
          {
            type: 'Value',
            value: 'ageOver18',
            children: [
              { type: 'Attr', value: 'ageOver18Field' },
            ],
          },
        ],
      },
    ];

    const runner = engine.create(rules);

    expect(runner.run({
      age: 5,
    })).toEqual({
      name: true,
      age: true,
      ageUnder10Field: true, 
      // ageBetween10And18Field: false,
      // ageOver18Field: false,
    });

    expect(runner.run({
      age: 15,
    })).toEqual({
      name: true,
      age: true,
      // ageUnder10Field: false, 
      ageBetween10And18Field: true,
      // ageOver18Field: false,
    });

    expect(runner.run({
      age: 25,
    })).toEqual({
      name: true,
      age: true,
      // ageUnder10Field: false, 
      // ageBetween10And18Field: false,
      ageOver18Field: true,
    });
  });
});
