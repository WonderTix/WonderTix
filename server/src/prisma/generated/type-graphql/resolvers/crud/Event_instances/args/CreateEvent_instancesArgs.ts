import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Event_instancesCreateInput} from '../../../inputs/Event_instancesCreateInput';

@TypeGraphQL.ArgsType()
export class CreateEvent_instancesArgs {
  @TypeGraphQL.Field((_type) => Event_instancesCreateInput, {
    nullable: false,
  })
    data!: Event_instancesCreateInput;
}
