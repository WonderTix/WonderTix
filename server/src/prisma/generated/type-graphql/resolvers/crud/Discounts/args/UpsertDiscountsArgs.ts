import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsCreateInput} from '../../../inputs/DiscountsCreateInput';
import {DiscountsUpdateInput} from '../../../inputs/DiscountsUpdateInput';
import {DiscountsWhereUniqueInput} from '../../../inputs/DiscountsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsWhereUniqueInput, {
    nullable: false,
  })
    where!: DiscountsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => DiscountsCreateInput, {
    nullable: false,
  })
    create!: DiscountsCreateInput;

  @TypeGraphQL.Field((_type) => DiscountsUpdateInput, {
    nullable: false,
  })
    update!: DiscountsUpdateInput;
}
