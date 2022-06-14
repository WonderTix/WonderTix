import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsUpdateManyMutationInput} from '../../../inputs/SeasonsUpdateManyMutationInput';
import {SeasonsWhereInput} from '../../../inputs/SeasonsWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManySeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsUpdateManyMutationInput, {
    nullable: false,
  })
    data!: SeasonsUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => SeasonsWhereInput, {
    nullable: true,
  })
    where?: SeasonsWhereInput | undefined;
}
