import engine from '../src';
import { IRuleNode } from '../src/core/sync';

describe('@zodash/rule-engine', () => {
  it('run', () => {
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

    const runner = engine.create.sync(rules);

    expect(
      runner.run({
        createdBy: 'manual',
      })
    ).toEqual({
      cipher: true,
      createdBy: true,
      description: true,
      isPublished: true,
      name: true,
      port: true,
      server: true,
      type: true,
    });

    expect(
      runner.run({
        createdBy: 'import.text',
      })
    ).toEqual({
      createdBy: true,
      importText: true,
      isPublished: true,
      description: true,
    });

    expect(
      runner.run({
        createdBy: 'import.qrcode',
      })
    ).toEqual({
      createdBy: true,
      importQRCode: true,
      isPublished: true,
      description: true,
    });

    expect(
      runner.run({
        createdBy: 'manual',
        type: 'ss',
      })
    ).toEqual({
      createdBy: true,
      type: true,
      password: true,
      name: true,
      server: true,
      port: true,
      cipher: true,
      isPublished: true,
      description: true,
    });

    expect(
      runner.run({
        createdBy: 'manual',
        type: 'vmess',
      })
    ).toEqual({
      createdBy: true,
      type: true,
      uuid: true,
      alterId: true,
      name: true,
      server: true,
      port: true,
      cipher: true,
      isPublished: true,
      description: true,
    });
  });
});
