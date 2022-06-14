import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsUpdateWithoutSeasonsInput} from '../inputs/EventsUpdateWithoutSeasonsInput';
import {EventsWhereUniqueInput} from '../inputs/EventsWhereUniqueInput';

@TypeGraphQL.InputType('EventsUpdateWithWhereUniqueWithoutSeasonsInput', {
  isAbstract: true,
})
export class EventsUpdateWithWhereUniqueWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => EventsWhereUniqueInput, {
    nullable: false,
  })
    where!: EventsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => EventsUpdateWithoutSeasonsInput, {
    nullable: false,
  })
    data!: EventsUpdateWithoutSeasonsInput;
}
