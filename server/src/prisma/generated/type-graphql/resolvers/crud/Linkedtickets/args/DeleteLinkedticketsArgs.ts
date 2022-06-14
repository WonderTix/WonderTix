import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {LinkedticketsWhereUniqueInput} from '../../../inputs/LinkedticketsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class DeleteLinkedticketsArgs {
  @TypeGraphQL.Field((_type) => LinkedticketsWhereUniqueInput, {
    nullable: false,
  })
    where!: LinkedticketsWhereUniqueInput;
}
