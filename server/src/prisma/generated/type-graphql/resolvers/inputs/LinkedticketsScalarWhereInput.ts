import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('LinkedticketsScalarWhereInput', {
  isAbstract: true,
})
export class LinkedticketsScalarWhereInput {
  @TypeGraphQL.Field((_type) => [LinkedticketsScalarWhereInput], {
    nullable: true,
  })
    AND?: LinkedticketsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LinkedticketsScalarWhereInput], {
    nullable: true,
  })
    OR?: LinkedticketsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LinkedticketsScalarWhereInput], {
    nullable: true,
  })
    NOT?: LinkedticketsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    event_instance_id?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    ticket_type?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    dummy?: StringNullableFilter | undefined;
}
