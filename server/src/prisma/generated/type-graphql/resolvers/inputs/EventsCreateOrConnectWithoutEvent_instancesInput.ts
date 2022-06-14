import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsCreateWithoutEvent_instancesInput} from '../inputs/EventsCreateWithoutEvent_instancesInput';
import {EventsWhereUniqueInput} from '../inputs/EventsWhereUniqueInput';

@TypeGraphQL.InputType('EventsCreateOrConnectWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class EventsCreateOrConnectWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => EventsWhereUniqueInput, {
    nullable: false,
  })
    where!: EventsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => EventsCreateWithoutEvent_instancesInput, {
    nullable: false,
  })
    create!: EventsCreateWithoutEvent_instancesInput;
}
