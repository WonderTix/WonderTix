import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsWhereUniqueInput} from '../../../inputs/SeasonsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class DeleteSeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsWhereUniqueInput, {
    nullable: false,
  })
    where!: SeasonsWhereUniqueInput;
}
