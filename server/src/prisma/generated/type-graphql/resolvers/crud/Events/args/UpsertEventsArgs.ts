import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {EventsCreateInput} from '../../../inputs/EventsCreateInput';
import {EventsUpdateInput} from '../../../inputs/EventsUpdateInput';
import {EventsWhereUniqueInput} from '../../../inputs/EventsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertEventsArgs {
  @TypeGraphQL.Field((_type) => EventsWhereUniqueInput, {
    nullable: false,
  })
    where!: EventsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => EventsCreateInput, {
    nullable: false,
  })
    create!: EventsCreateInput;

  @TypeGraphQL.Field((_type) => EventsUpdateInput, {
    nullable: false,
  })
    update!: EventsUpdateInput;
}
