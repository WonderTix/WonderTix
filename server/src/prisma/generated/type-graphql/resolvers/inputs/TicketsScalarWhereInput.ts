import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('TicketsScalarWhereInput', {
  isAbstract: true,
})
export class TicketsScalarWhereInput {
  @TypeGraphQL.Field((_type) => [TicketsScalarWhereInput], {
    nullable: true,
  })
    AND?: TicketsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsScalarWhereInput], {
    nullable: true,
  })
    OR?: TicketsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsScalarWhereInput], {
    nullable: true,
  })
    NOT?: TicketsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    ticketno?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    type?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    eventinstanceid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    custid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    paid?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    active?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    checkedin?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    checkedin_ts?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    payment_intent?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    comments?: StringNullableFilter | undefined;
}
