import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {DecimalNullableFilter} from '../inputs/DecimalNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('TickettypeScalarWhereInput', {
  isAbstract: true,
})
export class TickettypeScalarWhereInput {
  @TypeGraphQL.Field((_type) => [TickettypeScalarWhereInput], {
    nullable: true,
  })
    AND?: TickettypeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeScalarWhereInput], {
    nullable: true,
  })
    OR?: TickettypeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeScalarWhereInput], {
    nullable: true,
  })
    NOT?: TickettypeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    isseason?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    seasonid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalNullableFilter, {
    nullable: true,
  })
    price?: DecimalNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalNullableFilter, {
    nullable: true,
  })
    concessions?: DecimalNullableFilter | undefined;
}
