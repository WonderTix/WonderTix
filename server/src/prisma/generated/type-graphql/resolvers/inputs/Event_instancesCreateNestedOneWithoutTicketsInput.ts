import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesCreateOrConnectWithoutTicketsInput} from '../inputs/Event_instancesCreateOrConnectWithoutTicketsInput';
import {Event_instancesCreateWithoutTicketsInput} from '../inputs/Event_instancesCreateWithoutTicketsInput';
import {Event_instancesWhereUniqueInput} from '../inputs/Event_instancesWhereUniqueInput';

@TypeGraphQL.InputType('Event_instancesCreateNestedOneWithoutTicketsInput', {
  isAbstract: true,
})
export class Event_instancesCreateNestedOneWithoutTicketsInput {
  @TypeGraphQL.Field((_type) => Event_instancesCreateWithoutTicketsInput, {
    nullable: true,
  })
    create?: Event_instancesCreateWithoutTicketsInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesCreateOrConnectWithoutTicketsInput, {
    nullable: true,
  })
    connectOrCreate?: Event_instancesCreateOrConnectWithoutTicketsInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesWhereUniqueInput, {
    nullable: true,
  })
    connect?: Event_instancesWhereUniqueInput | undefined;
}
