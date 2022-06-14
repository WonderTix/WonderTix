// api/util/query-builder.ts

import {useOp} from './ops';

export interface QueryAttr {
  fields?: Array<string>;
  filters?: Object;
  sort?: Object;
}

/**
 * @param {string} tableName Name of the table to build the query for.
 * @param {QueryAttr} [params] List of query attributes.
 * @return {string} query Built query.
 */
export function buildQuery(
    tableName: string,
    params: QueryAttr | undefined): string {
  let query = 'SELECT ';

  if (params === undefined) {
    return `SELECT * FROM ${tableName}`;
  }

  // Add fields
  if (params.fields) {
    query += parseFields(params.fields);
  } else {
    query += '* '; // unspecified fields queries all
  }

  // Add table name
  query += `FROM ${tableName} `;

  // Add filters
  if (params.filters) {
    query += parseFilters(params.filters);
  }

  // Add sort
  if (params.sort) {
    query += parseSort(params.sort);
  }

  // console.log(query);
  return query;
}

/* Helper Functions */
/**
 * @param {Array<string>} fields Fields to parse through.
 * @return {string} res fields parsed as a string.
 */
function parseFields(fields: Array<string>): string {
  let res = '';
  const len = fields.length;

  for (let i = 0; i < len; i++) {
    res += fields[i];

    if (i !== len - 1) {
      res += ', ';
    } else {
      res += ' ';
    }
  }

  return res;
}

/**
 * @param {Object} filters Filters object.
 * @return {string} res String of parsed filters.
 */
function parseFilters(filters: Object): string {
  let res = '';
  const entries = Object.entries(filters);
  const len = entries.length;
  res += 'WHERE ';

  for (let i = 0; i < len; i++) {
    const [key, obj] = entries[i];
    const [[op, value]] = Object.entries(obj);
    res += useOp(op, key, value);

    if (i !== len - 1) {
      res += 'AND ';
    }
  }

  return res;
}

/**
 * @param {Object} sort Object of fields to sort.
 * @return {string} ORDER BY query string.
 */
function parseSort(sort: Object): string {
  const [[key, value]] = Object.entries(sort);
  return `ORDER BY ${key} ${value} `;
}
