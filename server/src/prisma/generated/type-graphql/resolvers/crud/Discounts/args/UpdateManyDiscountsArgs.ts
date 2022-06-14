import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsUpdateManyMutationInput} from '../../../inputs/DiscountsUpdateManyMutationInput';
import {DiscountsWhereInput} from '../../../inputs/DiscountsWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsUpdateManyMutationInput, {
    nullable: false,
  })
    data!: DiscountsUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => DiscountsWhereInput, {
    nullable: true,
  })
    where?: DiscountsWhereInput | undefined;
}
