import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {LinkedticketsUpdateManyMutationInput} from '../../../inputs/LinkedticketsUpdateManyMutationInput';
import {LinkedticketsWhereInput} from '../../../inputs/LinkedticketsWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyLinkedticketsArgs {
  @TypeGraphQL.Field((_type) => LinkedticketsUpdateManyMutationInput, {
    nullable: false,
  })
    data!: LinkedticketsUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => LinkedticketsWhereInput, {
    nullable: true,
  })
    where?: LinkedticketsWhereInput | undefined;
}
