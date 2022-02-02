// api/util/query-builder.ts

export interface QueryAttr {
  fields?: Array<string>;
  filters?: Object;
  sort?: Object;
}

const operators: any = {
  $eq: '='
  // TODO -- $contains: ''
};

export function buildQuery(tableName: string, params: QueryAttr | undefined) {
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

function parseFields(fields: Array<string>) {
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

function parseFilters(filters: Object) {
  let res = '';
  const entries = Object.entries(filters);
  const len = entries.length;
  res += 'WHERE ';

  for (let i = 0; i < len; i++) {
    const [key, obj] = entries[i];
    const [[op, value]] = Object.entries(obj);
    res += `${key} ${operators[op]} \'${value}\' `;

    if (i !== len - 1) {
      res += 'AND ';
    }
  }

  return res;
}

function parseSort(sort: Object) {
  const [[key, value]] = Object.entries(sort);
  return `ORDER BY ${key} ${value} `;
}
