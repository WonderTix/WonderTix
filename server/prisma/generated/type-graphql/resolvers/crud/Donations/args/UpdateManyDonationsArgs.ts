import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DonationsUpdateManyMutationInput } from "../../../inputs/DonationsUpdateManyMutationInput";
import { DonationsWhereInput } from "../../../inputs/DonationsWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyDonationsArgs {
  @TypeGraphQL.Field(_type => DonationsUpdateManyMutationInput, {
    nullable: false
  })
  data!: DonationsUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => DonationsWhereInput, {
    nullable: true
  })
  where?: DonationsWhereInput | undefined;
}
