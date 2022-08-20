/*
 * N: newly added property/element
 * E: property/element was edited
 * D: property/element was deleted
 * A: Change occured within array
 */
export default interface Delta {
  kind: 'N' | 'E' | 'D' | 'A';
  path: Array<string | number>;
  lhs?: any;
  rhs: any;
}
