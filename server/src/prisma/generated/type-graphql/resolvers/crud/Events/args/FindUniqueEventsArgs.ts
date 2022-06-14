import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {EventsWhereUniqueInput} from '../../../inputs/EventsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueEventsArgs {
  @TypeGraphQL.Field((_type) => EventsWhereUniqueInput, {
    nullable: false,
  })
    where!: EventsWhereUniqueInput;
}
