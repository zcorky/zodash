import {
  IRuleNode,
  IRuleAttrNode,
  IShowData,
  IOnScaleTo,
  Options,
} from './types';

const DEFAULT_ON_SCALE_TO: IOnScaleTo<any> = (dataSource, name) => {
  return dataSource[name];
};

export function create<DataSource>(rules: IRuleNode<DataSource>[], options?: Options<DataSource>) {
  const defaultOnScaleTo = options?.defaultOnScaleTo || DEFAULT_ON_SCALE_TO;

  // real runner
  function run(dataSource: Partial<DataSource>) {
    const shows: IShowData<DataSource> = Object
      .keys(dataSource)
      .reduce((all, key) => (all[key] = false, all), {} as any);
  
    let attrNodeOfValue: IRuleAttrNode<DataSource> = null;
    
    function go(_rules: IRuleNode<DataSource>[]) {
      for (const rule of _rules) {
        // @1 attr show
        if (rule.type === 'Attr') {
          // @1.1 set value
          if (!shows[rule.value]) {
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
          const sacleTo: IOnScaleTo<DataSource> = attrNodeOfValue.onScaleTo || defaultOnScaleTo;
          
          const scaledValue = sacleTo(dataSource, attrNodeOfValue.value);
  
          // radio, must be equal
          if (typeof rule.value === 'string' && scaledValue === rule.value) {
            go(rule.children);
            // checkbox, may be oneof
          } else if (Array.isArray(rule.value) && rule.value.includes(scaledValue)) {
            go(rule.children)
          }
        } else {
          throw new Error(`Invalid Rule Type(${(rule as any).type})`);
        }
      }
    }
  
    go(rules);
  
    return shows;
  };

  return {
    run,
  };
}

export default {
  create,
};
