import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsWhereInput} from '../../../inputs/DiscountsWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsWhereInput, {
    nullable: true,
  })
    where?: DiscountsWhereInput | undefined;
}
