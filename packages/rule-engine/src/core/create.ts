import {
  IRuleNode,
  IRuleAttrNode,
  IShowData,
  IOnScaleTo,
  IOnHitAttr,
  Options,
} from './types';

import { create as createSync } from './sync';

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
  async function run(dataSource: Partial<DataSource>) {
    let shows: IShowData<DataSource> = {} as any;

    const allRuleKeys: Record<string, boolean> = {};

    let attrNodeOfValue: IRuleAttrNode<DataSource> = null;

    function traverse(rules: IRuleNode<DataSource>[]) {
      for (const rule of rules) {
        if (rule.type === 'Attr') {
          allRuleKeys[rule.value] = true;

          if (rule.children && !!rule.children.length) {
            traverse(rule.children);
          }
        } else if (rule.type === 'Value') {
          if (rule.children && !!rule.children.length) {
            traverse(rule.children);
          }
        }
      }
    }

    function initializeShows() {
      traverse(rules);

      shows = Object.keys(dataSource).reduce((all, key) => {
        // 所有未参与的 key 都应该是 true
        if (!allRuleKeys[key]) {
          all[key] = true;
        } else {
          all[key] = false;
        }

        return all;
      }, {} as any);
    }

    async function go(_rules: IRuleNode<DataSource>[]) {
      for (const rule of _rules) {
        // @1 attr show
        if (rule.type === 'Attr') {
          // @1.1 set value
          if (!shows[rule.value]) {
            // hit attr first time
            const onHitAttr = getOnHitAttr(rule);
            if (onHitAttr) {
              await onHitAttr(rule.value, dataSource);
            }

            shows[rule.value] = true;
          }

          // @1.2 map deep children
          if (rule.children && !!rule.children.length) {
            attrNodeOfValue = rule;

            await go(rule.children);
          }

          continue;
        } else if (rule.type === 'Value') {
          // @2 value compare
          const sacleTo: IOnScaleTo<DataSource> = getOnScaleTo();

          const scaledValue = await sacleTo(
            dataSource,
            attrNodeOfValue.value,
          );

          // radio/switch/select, must be equal
          const valueType = typeof rule.value;
          if (
            ['string', 'number', 'boolean'].includes(valueType) &&
            scaledValue === rule.value
          ) {
            await go(rule.children);
          }
          // checkbox, may be oneof
          else if (
            Array.isArray(rule.value) &&
            rule.value.includes(scaledValue)
          ) {
            await go(rule.children);
          }
        } else {
          throw new Error(`Invalid Rule Type(${(rule as any).type})`);
        }
      }
    }

    initializeShows();
    await go(rules);

    function getOnScaleTo() {
      return attrNodeOfValue.onScaleTo || defaultOnScaleTo;
    }

    function getOnHitAttr(node: IRuleAttrNode<DataSource>) {
      return node.onHitAttr || defaultOnHitAttr;
    }

    return shows;
  }

  return {
    run,
  };
}

// mount sync to create for better user experience
create.sync = createSync;
