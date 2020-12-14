import engine, { IRuleNode } from '../src';

describe('@zodash/rule-engine', () => {
  it('run', async () => {
    const rules: IRuleNode[] = [
      {
        type: 'Attr',
        value: 'createdBy',
        children: [
          {
            type: 'Value',
            value: 'manual',
            children: [
              {
                type: 'Attr',
                value: 'type',
                children: [
                  {
                    type: 'Value',
                    value: 'ss',
                    children: [
                      {
                        type: 'Attr',
                        value: 'password',
                      },
                    ],
                  },
                  {
                    type: 'Value',
                    value: 'vmess',
                    children: [
                      {
                        type: 'Attr',
                        value: 'uuid',
                      },
                      {
                        type: 'Attr',
                        value: 'alterId',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'Attr',
                value: 'name',
              },
              {
                type: 'Attr',
                value: 'server',
              },
              {
                type: 'Attr',
                value: 'port',
              },
              {
                type: 'Attr',
                value: 'cipher',
              },
            ],
          },
          {
            type: 'Value',
            value: 'import.text',
            children: [
              {
                type: 'Attr',
                value: 'importText',
              },
            ],
          },
          {
            type: 'Value',
            value: 'import.qrcode',
            children: [
              {
                type: 'Attr',
                value: 'importQRCode',
              },
            ],
          },
        ],
      },
      {
        type: 'Attr',
        value: 'isPublished',
      },
      {
        type: 'Attr',
        value: 'description',
      },
    ];

    const runner = engine.create(rules);

    expect(await runner.run({
      createdBy: 'manual',
    })).toEqual({
      cipher: true,
      createdBy: true,
      description: true,
      isPublished: true,
      name: true,
      port: true,
      server: true,
      type: true,
    });

    expect(await runner.run({
      createdBy: 'import.text',
    })).toEqual({
      createdBy: true,
      importText: true,
      isPublished: true,
      description: true
    });

    expect(await runner.run({
      createdBy: 'import.qrcode',
    })).toEqual({
      createdBy: true,
      importQRCode: true,
      isPublished: true,
      description: true
    });

    expect(await runner.run({
      createdBy: 'manual',
      type: 'ss',
    })).toEqual({
      createdBy: true,
      type: true,
      password: true,
      name: true,
      server: true,
      port: true,
      cipher: true,
      isPublished: true,
      description: true
    });

    expect(await runner.run({
      createdBy: 'manual',
      type: 'vmess',
    })).toEqual({
      createdBy: true,
      type: true,
      uuid: true,
      alterId: true,
      name: true,
      server: true,
      port: true,
      cipher: true,
      isPublished: true,
      description: true
    });
  });

  it('state machine', async () => {
    const rules: IRuleNode[] = [
      {
        type: 'Attr',
        value: 'current',
        children: [
          {
            type: 'Value',
            value: 'goFront',
            children: [
              {
                type: 'Attr',
                value: 'goBack',
              },
              {
                type: 'Attr',
                value: 'refresh',
              },
            ],
          },
          {
            type: 'Value',
            value: 'goBack',
            children: [
              {
                type: 'Attr',
                value: 'goFront',
              },
              {
                type: 'Attr',
                value: 'refresh',
              },
            ],
          },
          {
            type: 'Value',
            value: 'refresh',
            children: [
              {
                type: 'Attr',
                value: 'goFront',
              },
              {
                type: 'Attr',
                value: 'goBack',
              },
            ],
          },
        ],
      },
    ];

    const runner = engine.create(rules);

    expect(await runner.run({
      current: 'goFront',
    })).toEqual({
      current: true,
      // goFront: false,
      goBack: true,
      refresh: true,
    });

    expect(await runner.run({
      current: 'goBack',
    })).toEqual({
      current: true,
      goFront: true,
      // goBack: true,
      refresh: true,
    });

    expect(await runner.run({
      current: 'refresh',
    })).toEqual({
      current: true,
      goFront: true,
      goBack: true,
      // refresh: true,
    });
  });
});


// var a = {
//   goFront: {
//     goBack: true,
//     refresh: true,
//   },
//   goBack: {
//     goFront: true,
//     refresh: true,
//   },
//   refresh: {
//     goFront: true,
//     goBack: true,
//   },
// }