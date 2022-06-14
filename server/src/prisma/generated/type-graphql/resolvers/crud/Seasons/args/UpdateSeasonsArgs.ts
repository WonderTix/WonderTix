import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsUpdateInput} from '../../../inputs/SeasonsUpdateInput';
import {SeasonsWhereUniqueInput} from '../../../inputs/SeasonsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateSeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsUpdateInput, {
    nullable: false,
  })
    data!: SeasonsUpdateInput;

  @TypeGraphQL.Field((_type) => SeasonsWhereUniqueInput, {
    nullable: false,
  })
    where!: SeasonsWhereUniqueInput;
}
