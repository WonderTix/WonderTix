import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('LinkedticketsOrderByRelationAggregateInput', {
  isAbstract: true,
})
export class LinkedticketsOrderByRelationAggregateInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    _count?: 'asc' | 'desc' | undefined;
}
