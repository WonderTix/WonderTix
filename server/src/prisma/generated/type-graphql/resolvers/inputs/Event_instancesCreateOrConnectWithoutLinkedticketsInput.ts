import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesCreateWithoutLinkedticketsInput} from '../inputs/Event_instancesCreateWithoutLinkedticketsInput';
import {Event_instancesWhereUniqueInput} from '../inputs/Event_instancesWhereUniqueInput';

@TypeGraphQL.InputType('Event_instancesCreateOrConnectWithoutLinkedticketsInput', {
  isAbstract: true,
})
export class Event_instancesCreateOrConnectWithoutLinkedticketsInput {
  @TypeGraphQL.Field((_type) => Event_instancesWhereUniqueInput, {
    nullable: false,
  })
    where!: Event_instancesWhereUniqueInput;

  @TypeGraphQL.Field((_type) => Event_instancesCreateWithoutLinkedticketsInput, {
    nullable: false,
  })
    create!: Event_instancesCreateWithoutLinkedticketsInput;
}
