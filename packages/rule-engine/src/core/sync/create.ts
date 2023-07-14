import {
  IRuleNode,
  IRuleAttrNode,
  IShowData,
  IOnScaleTo,
  IOnHitAttr,
  Options,
} from './types';

const DEFAULT_ON_SCALE_TO: IOnScaleTo<any> = (dataSource, name) =>
  dataSource[name];

const DEFAULT_ON_HIT_ATTR: IOnHitAttr<any> = () => null;

export function create<DataSource>(
  rules: IRuleNode<DataSource>[],
  options?: Options<DataSource>,
) {
  const defaultOnScaleTo = options?.defaultOnScaleTo || DEFAULT_ON_SCALE_TO;
  const defaultOnHitAttr = options?.defaultOnHitAttr || DEFAULT_ON_HIT_ATTR;

  // real runner
  function run(dataSource: Partial<DataSource>) {
    const shows: IShowData<DataSource> = Object.keys(dataSource).reduce(
      (all, key) => ((all[key] = false), all),
      {} as any,
    );

    let attrNodeOfValue: IRuleAttrNode<DataSource> = null;

    function go(_rules: IRuleNode<DataSource>[]) {
      for (const rule of _rules) {
        // @1 attr show
        if (rule.type === 'Attr') {
          // @1.1 set value
          if (!shows[rule.value]) {
            // hit attr first time
            const onHitAttr = getOnHitAttr(rule);
            if (onHitAttr) {
              onHitAttr(rule.value, dataSource);
            }

            shows[rule.value] = true;
          }

          // @1.2 map deep children
          if (rule.children && !!rule.children.length) {
            attrNodeOfValue = rule;

            go(rule.children);
          }

          continue;
        } else if (rule.type === 'Value') {
          // @2 value compare
          const sacleTo: IOnScaleTo<DataSource> = getOnScaleTo();

          const scaledValue = sacleTo(dataSource, attrNodeOfValue.value);

          // radio/switch/select, must be equal
          const valueType = typeof rule.value;
          if (
            ['string', 'number', 'boolean'].includes(valueType) &&
            scaledValue === rule.value
          ) {
            go(rule.children);
          }
          // checkbox, may be oneof
          else if (
            Array.isArray(rule.value) &&
            rule.value.includes(scaledValue)
          ) {
            go(rule.children);
          }
        } else {
          throw new Error(`Invalid Rule Type(${(rule as any).type})`);
        }
      }
    }

    function getOnScaleTo() {
      return attrNodeOfValue.onScaleTo || defaultOnScaleTo;
    }

    function getOnHitAttr(node: IRuleAttrNode<DataSource>) {
      return node.onHitAttr || defaultOnHitAttr;
    }

    go(rules);

    return shows;
  }

  return {
    run,
  };
}
