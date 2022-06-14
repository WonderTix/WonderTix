import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesCreateWithoutEventsInput} from '../inputs/Event_instancesCreateWithoutEventsInput';
import {Event_instancesWhereUniqueInput} from '../inputs/Event_instancesWhereUniqueInput';

@TypeGraphQL.InputType('Event_instancesCreateOrConnectWithoutEventsInput', {
  isAbstract: true,
})
export class Event_instancesCreateOrConnectWithoutEventsInput {
  @TypeGraphQL.Field((_type) => Event_instancesWhereUniqueInput, {
    nullable: false,
  })
    where!: Event_instancesWhereUniqueInput;

  @TypeGraphQL.Field((_type) => Event_instancesCreateWithoutEventsInput, {
    nullable: false,
  })
    create!: Event_instancesCreateWithoutEventsInput;
}
