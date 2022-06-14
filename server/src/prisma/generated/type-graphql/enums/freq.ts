import * as TypeGraphQL from 'type-graphql';

export enum freq {
  one_time = 'one_time',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly'
}
TypeGraphQL.registerEnumType(freq, {
  name: 'freq',
  description: undefined,
});
