import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DonationsWhereInput} from '../../../inputs/DonationsWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyDonationsArgs {
  @TypeGraphQL.Field((_type) => DonationsWhereInput, {
    nullable: true,
  })
    where?: DonationsWhereInput | undefined;
}
