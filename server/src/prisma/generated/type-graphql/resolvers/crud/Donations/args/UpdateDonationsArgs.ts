import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DonationsUpdateInput} from '../../../inputs/DonationsUpdateInput';
import {DonationsWhereUniqueInput} from '../../../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateDonationsArgs {
  @TypeGraphQL.Field((_type) => DonationsUpdateInput, {
    nullable: false,
  })
    data!: DonationsUpdateInput;

  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: false,
  })
    where!: DonationsWhereUniqueInput;
}
