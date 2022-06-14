import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesScalarWhereInput} from '../inputs/Event_instancesScalarWhereInput';
import {Event_instancesUpdateManyMutationInput} from '../inputs/Event_instancesUpdateManyMutationInput';

@TypeGraphQL.InputType('Event_instancesUpdateManyWithWhereWithoutEventsInput', {
  isAbstract: true,
})
export class Event_instancesUpdateManyWithWhereWithoutEventsInput {
  @TypeGraphQL.Field((_type) => Event_instancesScalarWhereInput, {
    nullable: false,
  })
    where!: Event_instancesScalarWhereInput;

  @TypeGraphQL.Field((_type) => Event_instancesUpdateManyMutationInput, {
    nullable: false,
  })
    data!: Event_instancesUpdateManyMutationInput;
}
