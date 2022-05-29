import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DonationsCreateInput } from "../../../inputs/DonationsCreateInput";

@TypeGraphQL.ArgsType()
export class CreateDonationsArgs {
  @TypeGraphQL.Field(_type => DonationsCreateInput, {
    nullable: false
  })
  data!: DonationsCreateInput;
}
