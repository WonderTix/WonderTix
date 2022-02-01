// api/util/query-builder.ts

import { QueryAttributes } from './query-attributes';

const operators = {
  $eq: '= ',
  $contains: ''
};

/* Remember to always add a space after each query item! */

export class QueryBuilder {
  table: string;
  query: string;
  attributes: QueryAttributes;

  constructor(table: string, params: Object) {
    this.table = table;
    this.query = ``;
    this.attributes = new QueryAttributes(params);
  }

  build() {
    this.query += `SELECT `;

    // add fields to query
    if (this.attributes['fields'] !== '') {
      const entries = Object.entries(this.attributes['fields']);
      for (const [i, value] of entries) {
        this.query += `${value} `;
        if (parseInt(i) !== entries.length - 1) {
          this.query += `, `;
        }
      }
    } else {
      this.query += `* `;
    }

    this.query += `FROM ${this.table} `;

    // add filters to query
    if (this.attributes['filters'] !== '') {
      const entries = Object.entries(this.attributes['filters']);
      let i = 0;

      this.query += `WHERE `;

      for (const [key, value] of entries) {
        this.query += `${key} = \'${value}\' `;

        if (i !== entries.length - 1) {
          this.query += `AND `;
        }

        i += 1;
      }
    }

    // add sorting to query
    if (this.attributes['sort'] !== '') {
      const [[key, value]] = Object.entries(this.attributes['sort']);
      this.query += `ORDER BY ${key} ${value} `;
    }

    console.log(this.query);
    return this.query;
  }
}
