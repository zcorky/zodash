/**
 * Attribute Node
 */
export interface IRuleAttrNode {
  /**
   * Type: Attr
   */
  type: 'Attr';

  /**
   * Attribute Name
   */
  value: string;

  /**
   * Attribute Children must be Value Node, such as select.options
   */
  children?: IRuleValueNode[];
}

/**
 * Value Node
 */
export interface IRuleValueNode {
  /**
   * Type: Value
   */
  type: 'Value';
 
  /**
   * Attribute Value
   *  such as option in select
   * 
   * 值，单选时是一个值（必须相等），多选是是多个值（满足其中一个即可）
   */
  value: string | string[]; 

  /**
   * Value Children must be Attribute Node, means the next attributes
   */
  children: IRuleAttrNode[];
}

/**
 * Rule Node
 *  = Attribute Node + Value Node
 */
export type IRuleNode = IRuleAttrNode | IRuleValueNode;


// /**
//  * DataSource
//  */
// export interface DataSource extends Record<string, any> {

// }

/**
 * Return Show Data
 */
export type ShowData<DataSource extends Record<string, any>> = {
  [K in keyof DataSource]: boolean;
}
