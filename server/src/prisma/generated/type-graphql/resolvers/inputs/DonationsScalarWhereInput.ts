import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {DecimalNullableFilter} from '../inputs/DecimalNullableFilter';
import {EnumfreqNullableFilter} from '../inputs/EnumfreqNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('DonationsScalarWhereInput', {
  isAbstract: true,
})
export class DonationsScalarWhereInput {
  @TypeGraphQL.Field((_type) => [DonationsScalarWhereInput], {
    nullable: true,
  })
    AND?: DonationsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsScalarWhereInput], {
    nullable: true,
  })
    OR?: DonationsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsScalarWhereInput], {
    nullable: true,
  })
    NOT?: DonationsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    donorid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    isanonymous?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DecimalNullableFilter, {
    nullable: true,
  })
    amount?: DecimalNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    dononame?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumfreqNullableFilter, {
    nullable: true,
  })
    frequency?: EnumfreqNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    comments?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    donodate?: DateTimeNullableFilter | undefined;
}
