import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DonationsCreateManyInput } from "../../../inputs/DonationsCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyDonationsArgs {
  @TypeGraphQL.Field(_type => [DonationsCreateManyInput], {
    nullable: false
  })
  data!: DonationsCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
