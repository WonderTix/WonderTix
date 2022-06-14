import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsCreateInput} from '../../../inputs/DiscountsCreateInput';

@TypeGraphQL.ArgsType()
export class CreateDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsCreateInput, {
    nullable: false,
  })
    data!: DiscountsCreateInput;
}
