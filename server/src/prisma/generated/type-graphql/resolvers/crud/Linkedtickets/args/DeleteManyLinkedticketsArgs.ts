import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {LinkedticketsWhereInput} from '../../../inputs/LinkedticketsWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyLinkedticketsArgs {
  @TypeGraphQL.Field((_type) => LinkedticketsWhereInput, {
    nullable: true,
  })
    where?: LinkedticketsWhereInput | undefined;
}
