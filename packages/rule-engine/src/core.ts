import { IRuleNode, ShowData } from './types';

export function create(rules: IRuleNode[]) {

  // real runner
  function run<D>(dataSource: D) {
    const shows: ShowData<D> = Object
      .keys(dataSource)
      .reduce((all, key) => (all[key] = false, all), {} as any);
  
    let attrOfValue = '';
    
    function go(_rules: IRuleNode[]) {
      for (const rule of _rules) {
        // @1 attr show
        if (rule.type === 'Attr') {
          // @1.1 set value
          if (!shows[rule.value]) {
            shows[rule.value] = true;
          }
  
          // @1.2 map deep children
          if (rule.children && !!rule.children.length) {
            attrOfValue = rule.value;
            go(rule.children);
          }
  
          continue;
        } else if (rule.type === 'Value') {
          // @2 value compare
          const currentValue = dataSource[attrOfValue];
  
          // radio, must be equal
          if (typeof rule.value === 'string' && currentValue === rule.value) {
            go(rule.children);
            // checkbox, may be oneof
          } else if (Array.isArray(rule.value) && rule.value.includes(currentValue)) {
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