import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {LinkedticketsUpdateInput} from '../../../inputs/LinkedticketsUpdateInput';
import {LinkedticketsWhereUniqueInput} from '../../../inputs/LinkedticketsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateLinkedticketsArgs {
  @TypeGraphQL.Field((_type) => LinkedticketsUpdateInput, {
    nullable: false,
  })
    data!: LinkedticketsUpdateInput;

  @TypeGraphQL.Field((_type) => LinkedticketsWhereUniqueInput, {
    nullable: false,
  })
    where!: LinkedticketsWhereUniqueInput;
}
