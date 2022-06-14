import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Event_instancesCreateInput} from '../../../inputs/Event_instancesCreateInput';
import {Event_instancesUpdateInput} from '../../../inputs/Event_instancesUpdateInput';
import {Event_instancesWhereUniqueInput} from '../../../inputs/Event_instancesWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertEvent_instancesArgs {
  @TypeGraphQL.Field((_type) => Event_instancesWhereUniqueInput, {
    nullable: false,
  })
    where!: Event_instancesWhereUniqueInput;

  @TypeGraphQL.Field((_type) => Event_instancesCreateInput, {
    nullable: false,
  })
    create!: Event_instancesCreateInput;

  @TypeGraphQL.Field((_type) => Event_instancesUpdateInput, {
    nullable: false,
  })
    update!: Event_instancesUpdateInput;
}
