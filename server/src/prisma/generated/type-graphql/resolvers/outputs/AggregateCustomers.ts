import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersAvgAggregate} from '../outputs/CustomersAvgAggregate';
import {CustomersCountAggregate} from '../outputs/CustomersCountAggregate';
import {CustomersMaxAggregate} from '../outputs/CustomersMaxAggregate';
import {CustomersMinAggregate} from '../outputs/CustomersMinAggregate';
import {CustomersSumAggregate} from '../outputs/CustomersSumAggregate';

@TypeGraphQL.ObjectType('AggregateCustomers', {
  isAbstract: true,
})
export class AggregateCustomers {
  @TypeGraphQL.Field((_type) => CustomersCountAggregate, {
    nullable: true,
  })
    _count!: CustomersCountAggregate | null;

  @TypeGraphQL.Field((_type) => CustomersAvgAggregate, {
    nullable: true,
  })
    _avg!: CustomersAvgAggregate | null;

  @TypeGraphQL.Field((_type) => CustomersSumAggregate, {
    nullable: true,
  })
    _sum!: CustomersSumAggregate | null;

  @TypeGraphQL.Field((_type) => CustomersMinAggregate, {
    nullable: true,
  })
    _min!: CustomersMinAggregate | null;

  @TypeGraphQL.Field((_type) => CustomersMaxAggregate, {
    nullable: true,
  })
    _max!: CustomersMaxAggregate | null;
}
