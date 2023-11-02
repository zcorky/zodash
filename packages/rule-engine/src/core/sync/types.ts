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
   */
  onScaleTo?: IOnScaleTo<DataSource>;

  /**
   * Interface to emit a message when hit attr, maybe show your field
   */
  onHitAttr?: IOnHitAttr<DataSource>;
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
  value: IRuleValueNodeValue | IRuleValueNodeValue[];

  /**
   * Value Children must be Attribute Node, means the next attributes
   */
  children: IRuleAttrNode<DataSource>[];
}

/**
 * Value Node Value
 */
export type IRuleValueNodeValue = string | number | boolean;

/**
 * Rule Node
 *  = Attribute Node + Value Node
 */
export type IRuleNode<DataSource = any> =
  | IRuleAttrNode<DataSource>
  | IRuleValueNode<DataSource>;

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
};

/**
 * Caculate Current Attribute Value
 *  used to compare his children options
 *  which mean strategies pattern
 *
 * @param dataSource dataSource
 * @param attributeName attribute name
 */
export type IOnScaleTo<DataSource> = (
  dataSource: Partial<DataSource>,
  attributeName: string,
) => string;

/**
 * Interface to emit a message when hit attr, maybe show your field
 *
 * @param attributeName attribute name
 * @param dataSource dataSource
 */
export type IOnHitAttr<DataSource> = (
  attributeName: string,
  dataSource: DataSource,
) => void;

/**
 * Create Options
 */
export interface Options<DataSource> {
  defaultOnScaleTo?: IOnScaleTo<DataSource>;
  defaultOnHitAttr?: IOnHitAttr<DataSource>;
  //
  dataSourceKeys?: string[];
}
