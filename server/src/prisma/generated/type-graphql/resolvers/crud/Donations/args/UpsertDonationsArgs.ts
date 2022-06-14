import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DonationsCreateInput} from '../../../inputs/DonationsCreateInput';
import {DonationsUpdateInput} from '../../../inputs/DonationsUpdateInput';
import {DonationsWhereUniqueInput} from '../../../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertDonationsArgs {
  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: false,
  })
    where!: DonationsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => DonationsCreateInput, {
    nullable: false,
  })
    create!: DonationsCreateInput;

  @TypeGraphQL.Field((_type) => DonationsUpdateInput, {
    nullable: false,
  })
    update!: DonationsUpdateInput;
}
