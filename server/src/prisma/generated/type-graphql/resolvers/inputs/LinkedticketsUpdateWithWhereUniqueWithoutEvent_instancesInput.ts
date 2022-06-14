import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {LinkedticketsUpdateWithoutEvent_instancesInput} from '../inputs/LinkedticketsUpdateWithoutEvent_instancesInput';
import {LinkedticketsWhereUniqueInput} from '../inputs/LinkedticketsWhereUniqueInput';

@TypeGraphQL.InputType('LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => LinkedticketsWhereUniqueInput, {
    nullable: false,
  })
    where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LinkedticketsUpdateWithoutEvent_instancesInput, {
    nullable: false,
  })
    data!: LinkedticketsUpdateWithoutEvent_instancesInput;
}
