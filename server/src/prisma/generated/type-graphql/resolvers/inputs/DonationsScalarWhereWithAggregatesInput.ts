import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableWithAggregatesFilter} from '../inputs/BoolNullableWithAggregatesFilter';
import {DateTimeNullableWithAggregatesFilter} from '../inputs/DateTimeNullableWithAggregatesFilter';
import {DecimalNullableWithAggregatesFilter} from '../inputs/DecimalNullableWithAggregatesFilter';
import {EnumfreqNullableWithAggregatesFilter} from '../inputs/EnumfreqNullableWithAggregatesFilter';
import {IntNullableWithAggregatesFilter} from '../inputs/IntNullableWithAggregatesFilter';
import {IntWithAggregatesFilter} from '../inputs/IntWithAggregatesFilter';
import {StringNullableWithAggregatesFilter} from '../inputs/StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('DonationsScalarWhereWithAggregatesInput', {
  isAbstract: true,
})
export class DonationsScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [DonationsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    AND?: DonationsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    OR?: DonationsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    NOT?: DonationsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
    id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    donorid?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableWithAggregatesFilter, {
    nullable: true,
  })
    isanonymous?: BoolNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalNullableWithAggregatesFilter, {
    nullable: true,
  })
    amount?: DecimalNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    dononame?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumfreqNullableWithAggregatesFilter, {
    nullable: true,
  })
    frequency?: EnumfreqNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    comments?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    donodate?: DateTimeNullableWithAggregatesFilter | undefined;
}
