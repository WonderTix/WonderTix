import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {LinkedticketsCreateWithoutEvent_instancesInput} from '../inputs/LinkedticketsCreateWithoutEvent_instancesInput';
import {LinkedticketsUpdateWithoutEvent_instancesInput} from '../inputs/LinkedticketsUpdateWithoutEvent_instancesInput';
import {LinkedticketsWhereUniqueInput} from '../inputs/LinkedticketsWhereUniqueInput';

@TypeGraphQL.InputType('LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => LinkedticketsWhereUniqueInput, {
    nullable: false,
  })
    where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LinkedticketsUpdateWithoutEvent_instancesInput, {
    nullable: false,
  })
    update!: LinkedticketsUpdateWithoutEvent_instancesInput;

  @TypeGraphQL.Field((_type) => LinkedticketsCreateWithoutEvent_instancesInput, {
    nullable: false,
  })
    create!: LinkedticketsCreateWithoutEvent_instancesInput;
}
