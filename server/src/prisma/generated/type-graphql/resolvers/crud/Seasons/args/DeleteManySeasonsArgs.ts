import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsWhereInput} from '../../../inputs/SeasonsWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManySeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsWhereInput, {
    nullable: true,
  })
    where?: SeasonsWhereInput | undefined;
}
