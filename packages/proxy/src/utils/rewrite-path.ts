
// import { lru as LRU, LRU as ILRU } from '@zcorky/lru';
// import { Options } from '../core/interface';

// export interface Rule {
//   regex: RegExp;
//   value: string;
// }

// let ruleCache: LRU<string, Rule[]> = new LRU(256); // : ILRU<string, Rule>;

// export const rewritePath = (patterns: Options['pathRewrite'], path: string) => {
//   let newPath = path;

//   let rules = ruleCache.get(path);

//   if (!rules) {
//     rules = Object.keys(patterns)
//       .map(key => {
//         const rule: Rule = {
//           regex: new RegExp(key),
//           value: patterns[key],
//         };

//         return rule;
//       });

//     ruleCache.set(path, rules);
//   }

//   rules.forEach(rule => {
//     if (rule.regex.test(path)) {
//       newPath = newPath.replace(rule.regex, rule.value);
//       return false;
//     }
//   });

//   return newPath;
// };