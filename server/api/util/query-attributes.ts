// api/util/query-attributes.ts

export class QueryAttributes {
  filters: string;
  sort: string;
  fields: string;

  constructor(attributes: Object) {
    this.filters = '';
    this.sort = '';
    this.fields = '';

    for (const [key, value] of Object.entries(attributes)) {
      switch (key) {
        case 'filters':
          this.filters = value;
          break;
        case 'sort':
          this.sort = value;
          break;
        case 'fields':
          this.fields = value;
          break;
      }
    }
  }
}
