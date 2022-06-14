import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {LinkedticketsWhereInput} from '../inputs/LinkedticketsWhereInput';

@TypeGraphQL.InputType('LinkedticketsListRelationFilter', {
  isAbstract: true,
})
export class LinkedticketsListRelationFilter {
  @TypeGraphQL.Field((_type) => LinkedticketsWhereInput, {
    nullable: true,
  })
    every?: LinkedticketsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsWhereInput, {
    nullable: true,
  })
    some?: LinkedticketsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsWhereInput, {
    nullable: true,
  })
    none?: LinkedticketsWhereInput | undefined;
}
