// api/util/ops.ts

/**
 * Simple operators.
 * Operators that funciton similar to `A OP B`
 *
 * Example: `id = 3'
 *
 */
const simpleOps: any = {
  $eq: '=',
  $lt: '<',
  $lte: '<=',
  $gt: '>',
  $gte: '>=',
};

/**
 * Convert opcode and operands into query clause.
 *
 * @param {string} op
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
export function useOp(op: string, a: string, b: any): string {
  if (simpleOps[op]) {
    return `${a} ${simpleOps[op]} \'${b}\' `;
  }

  switch (op) {
    case '$startsWith':
      return `${a} LIKE \'${b}%\' `;
    case '$endsWith':
      return `${a} LIKE \'%${b}\' `;
    case '$contains':
      return `${a} LIKE \'%${b}%\' `;
  }
  throw new Error('Operator not found');
}
