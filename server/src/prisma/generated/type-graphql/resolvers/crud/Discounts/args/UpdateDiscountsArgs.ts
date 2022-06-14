import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsUpdateInput} from '../../../inputs/DiscountsUpdateInput';
import {DiscountsWhereUniqueInput} from '../../../inputs/DiscountsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsUpdateInput, {
    nullable: false,
  })
    data!: DiscountsUpdateInput;

  @TypeGraphQL.Field((_type) => DiscountsWhereUniqueInput, {
    nullable: false,
  })
    where!: DiscountsWhereUniqueInput;
}
