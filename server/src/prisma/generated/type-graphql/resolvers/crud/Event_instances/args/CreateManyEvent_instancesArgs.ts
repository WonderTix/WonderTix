import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Event_instancesCreateManyInput} from '../../../inputs/Event_instancesCreateManyInput';

@TypeGraphQL.ArgsType()
export class CreateManyEvent_instancesArgs {
  @TypeGraphQL.Field((_type) => [Event_instancesCreateManyInput], {
    nullable: false,
  })
    data!: Event_instancesCreateManyInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
