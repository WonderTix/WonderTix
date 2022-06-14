import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DonationsWhereUniqueInput} from '../../../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueDonationsArgs {
  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: false,
  })
    where!: DonationsWhereUniqueInput;
}
