import { QueryAttr } from '../util/query-builder';

export interface Report {
  table_name: string;
  query: QueryAttr;
}
