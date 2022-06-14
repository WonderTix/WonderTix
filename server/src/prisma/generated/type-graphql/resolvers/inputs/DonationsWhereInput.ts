import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {CustomersRelationFilter} from '../inputs/CustomersRelationFilter';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {DecimalNullableFilter} from '../inputs/DecimalNullableFilter';
import {EnumfreqNullableFilter} from '../inputs/EnumfreqNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';
import {TaskListRelationFilter} from '../inputs/TaskListRelationFilter';

@TypeGraphQL.InputType('DonationsWhereInput', {
  isAbstract: true,
})
export class DonationsWhereInput {
  @TypeGraphQL.Field((_type) => [DonationsWhereInput], {
    nullable: true,
  })
    AND?: DonationsWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereInput], {
    nullable: true,
  })
    OR?: DonationsWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereInput], {
    nullable: true,
  })
    NOT?: DonationsWhereInput[] | undefined;

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

  @TypeGraphQL.Field((_type) => CustomersRelationFilter, {
    nullable: true,
  })
    customers?: CustomersRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => TaskListRelationFilter, {
    nullable: true,
  })
    task?: TaskListRelationFilter | undefined;
}
