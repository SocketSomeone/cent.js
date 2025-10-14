// @source: https://github.com/centrifugal/centrifuge-js/blob/master/src/types.ts

/**
 * Comparison operators for leaf filter nodes.
 * Used when FilterNode.op is empty (leaf node).
 */
export type FilterComparisonOperator =
	| 'eq' // equal
	| 'neq' // not equal
	| 'in' // value is in vals array
	| 'nin' // value is not in vals array
	| 'ex' // key exists in tags
	| 'nex' // key does not exist in tags
	| 'sw' // string starts with val
	| 'ew' // string ends with val
	| 'ct' // string contains val
	| 'lt' // numeric less than val
	| 'lte' // numeric less than or equal to val
	| 'gt' // numeric greater than val
	| 'gte'; // numeric greater than or equal to val

/**
 * Logical operators for complex filter nodes.
 * Used in FilterNode.op for combining multiple conditions.
 */
export type FilterLogicalOperator = 'and' | 'or' | 'not';

/**
 * FilterNode represents a node in a filter expression tree used for server-side
 * publication filtering. It can be either:
 * - A leaf node (comparison) when op is empty
 * - A logical operation node (and/or/not) when op is set
 *
 * @example
 * // Simple equality filter
 * const filter: FilterNode = {
 *   key: 'ticker',
 *   cmp: 'eq',
 *   val: 'BTC'
 * };
 *
 * @example
 * // Filter with multiple conditions
 * const filter: FilterNode = {
 *   op: 'and',
 *   nodes: [
 *     { key: 'ticker', cmp: 'eq', val: 'BTC' },
 *     { key: 'price', cmp: 'gt', val: '50000' }
 *   ]
 * };
 *
 * @example
 * // Filter with IN operator
 * const filter: FilterNode = {
 *   key: 'ticker',
 *   cmp: 'in',
 *   vals: ['BTC', 'ETH', 'SOL']
 * };
 */
export interface FilterNode {
	/**
	 * Operation type for this node:
	 * - "" (empty string or undefined) → leaf node (comparison)
	 * - "and" → logical AND of child nodes
	 * - "or" → logical OR of child nodes
	 * - "not" → logical NOT of a single child node
	 */
	op?: FilterLogicalOperator;

	/**
	 * Key for comparison (only valid for leaf nodes).
	 * The tag key to compare against.
	 */
	key?: string;

	/**
	 * Comparison operator for leaf nodes.
	 * Only meaningful if op is empty (leaf node).
	 */
	cmp?: FilterComparisonOperator;

	/**
	 * Single value used in most comparisons.
	 * Used with operators: eq, neq, sw, ew, ct, lt, lte, gt, gte.
	 */
	val?: string;

	/**
	 * Multiple values used for set comparisons.
	 * Used with operators: in, nin.
	 */
	vals?: string[];

	/**
	 * Child nodes for logical operations.
	 * Used when op is "and", "or", or "not".
	 */
	nodes?: FilterNode[];
}
