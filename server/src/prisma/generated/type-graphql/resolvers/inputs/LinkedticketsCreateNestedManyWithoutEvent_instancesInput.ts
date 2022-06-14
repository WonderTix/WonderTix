import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {LinkedticketsCreateManyEvent_instancesInputEnvelope} from '../inputs/LinkedticketsCreateManyEvent_instancesInputEnvelope';
import {LinkedticketsCreateOrConnectWithoutEvent_instancesInput} from '../inputs/LinkedticketsCreateOrConnectWithoutEvent_instancesInput';
import {LinkedticketsCreateWithoutEvent_instancesInput} from '../inputs/LinkedticketsCreateWithoutEvent_instancesInput';
import {LinkedticketsWhereUniqueInput} from '../inputs/LinkedticketsWhereUniqueInput';

@TypeGraphQL.InputType('LinkedticketsCreateNestedManyWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class LinkedticketsCreateNestedManyWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => [LinkedticketsCreateWithoutEvent_instancesInput], {
    nullable: true,
  })
    create?: LinkedticketsCreateWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LinkedticketsCreateOrConnectWithoutEvent_instancesInput], {
    nullable: true,
  })
    connectOrCreate?: LinkedticketsCreateOrConnectWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsCreateManyEvent_instancesInputEnvelope, {
    nullable: true,
  })
    createMany?: LinkedticketsCreateManyEvent_instancesInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [LinkedticketsWhereUniqueInput], {
    nullable: true,
  })
    connect?: LinkedticketsWhereUniqueInput[] | undefined;
}
