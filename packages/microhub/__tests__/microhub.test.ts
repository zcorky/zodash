import { Microhub, IMicrohub } from '../src/microhub';

describe("@zodash/microhub", () => {
  it('common function service', () => {
    interface FunctionService extends IMicrohub {
      discover(name: 'add'): typeof add;
      discover(name: 'sub'): typeof sub;
      discover(name: 'convertNumberToString'): typeof convertNumberToString;
    }

    const add = (n1: number, n2: number) => n1 + n2;
    const sub = (n1: number, n2: number) => n1 - n2;
    const convertNumberToString = (n: number) => n.toString();

    const microhub = Microhub.create<FunctionService>();
    
    microhub.register('add', add);
    microhub.register('sub', sub);
    microhub.register('convertNumberToString', convertNumberToString);

    expect(microhub.discover('add')).toBe(add);
    expect(microhub.discover('sub')).toBe(sub);
    expect(microhub.discover('multiple' as any)).toBeUndefined();
    expect(microhub.discover('add')(1, 2)).toBe(add(1, 2));
    expect(microhub.discover('sub')(1, 2)).toBe(sub(1, 2));
    expect(microhub.discover('convertNumberToString')(1)).toBe(convertNumberToString(1));
  });

  it('component service', () => {
    interface MicroComponentHub extends IMicrohub {
      discover(name: 'text'): typeof Text;
      discover(name: 'number'): typeof Number;
      discover(name: 'switch'): typeof Switch;
    }

    type Component<T> = (props: T) => any;

    type Props = {
      title: string;
      dataIndex: string;
      type: string;
      placeholder?: string;
      [key: string]: any;
    };

    interface TextProps extends Props {
      type: 'text';
    }

    interface NumberProps extends Props {
      type: 'number';
    }

    interface SwitchProps extends Props {
      type: 'switch';
    }

    const Text: Component<TextProps> = (props: Props) => null;
    const Number: Component<NumberProps> = (props: Props) => null;
    const Switch: Component<SwitchProps> = (props: Props) => null;

    const microhub = Microhub.create<MicroComponentHub>();
    
    microhub.register('text', Text);
    microhub.register('number', Number);
    microhub.register('switch', Switch);

    expect(microhub.discover('text')).toBe(Text);
    expect(microhub.discover('number')).toBe(Number);
    expect(microhub.discover('switch')).toBe(Switch);
  });
});
