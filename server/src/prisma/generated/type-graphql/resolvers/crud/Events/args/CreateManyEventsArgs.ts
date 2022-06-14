import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {EventsCreateManyInput} from '../../../inputs/EventsCreateManyInput';

@TypeGraphQL.ArgsType()
export class CreateManyEventsArgs {
  @TypeGraphQL.Field((_type) => [EventsCreateManyInput], {
    nullable: false,
  })
    data!: EventsCreateManyInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
