import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsCreateInput} from '../../../inputs/SeasonsCreateInput';

@TypeGraphQL.ArgsType()
export class CreateSeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsCreateInput, {
    nullable: false,
  })
    data!: SeasonsCreateInput;
}
