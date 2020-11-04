/**
 * Attribute Node
 */
export interface IRuleAttrNode<DataSource> {
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
  children?: IRuleValueNode<DataSource>[];

  /**
   * Caculate Current Attribute Value
   *  used to compare his children options
   *  which mean strategies pattern
   * 
   * @param dataSource dataSource
   * @param attributeName attribute name
   */
  onScaleTo?: IOnScaleTo<DataSource>;
}

/**
 * Value Node
 */
export interface IRuleValueNode<DataSource> {
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
  children: IRuleAttrNode<DataSource>[];
}

/**
 * Rule Node
 *  = Attribute Node + Value Node
 */
export type IRuleNode<DataSource = any> = IRuleAttrNode<DataSource> | IRuleValueNode<DataSource>;


// /**
//  * DataSource
//  */
// export interface DataSource extends Record<string, any> {

// }

/**
 * Return Show Data
 */
export type IShowData<DataSource extends Record<string, any>> = {
  [K in keyof DataSource]: boolean;
}

export type IOnScaleTo<DataSource> = (dataSource: Partial<DataSource>, attributeName: string) => string;