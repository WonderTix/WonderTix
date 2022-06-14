import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsScalarWhereInput} from '../inputs/EventsScalarWhereInput';
import {EventsUpdateManyMutationInput} from '../inputs/EventsUpdateManyMutationInput';

@TypeGraphQL.InputType('EventsUpdateManyWithWhereWithoutSeasonsInput', {
  isAbstract: true,
})
export class EventsUpdateManyWithWhereWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => EventsScalarWhereInput, {
    nullable: false,
  })
    where!: EventsScalarWhereInput;

  @TypeGraphQL.Field((_type) => EventsUpdateManyMutationInput, {
    nullable: false,
  })
    data!: EventsUpdateManyMutationInput;
}
