import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('Event_instancesScalarWhereInput', {
  isAbstract: true,
})
export class Event_instancesScalarWhereInput {
  @TypeGraphQL.Field((_type) => [Event_instancesScalarWhereInput], {
    nullable: true,
  })
    AND?: Event_instancesScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesScalarWhereInput], {
    nullable: true,
  })
    OR?: Event_instancesScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesScalarWhereInput], {
    nullable: true,
  })
    NOT?: Event_instancesScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    eventid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    eventdate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    starttime?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    salestatus?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    totalseats?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    availableseats?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    purchaseuri?: StringNullableFilter | undefined;
}
