// api/util/ops.ts

/**
 * Simple operators.
 * Operators that funciton similar to `A OP B`
 *
 * Example: `id = 3'
 *
 */
const simple_ops: any = {
  $eq: '=',
  $lt: '<',
  $lte: '<=',
  $gt: '>',
  $gte: '>='
};

/**
 * Convert opcode and operands into query clause.
 *
 * @param op
 * @param a
 * @param b
 */
export function useOp(op: string, a: string, b: any) {
  if (simple_ops[op]) {
    return `${a} ${simple_ops[op]} \'${b}\' `;
  }

  switch (op) {
    case '$startsWith':
      return `${a} LIKE \'${b}%\' `;
    case '$endsWith':
      return `${a} LIKE \'%${b}\' `;
    case '$contains':
      return `${a} LIKE \'%${b}%\' `;
  }

  throw 'Operator not found';
}
