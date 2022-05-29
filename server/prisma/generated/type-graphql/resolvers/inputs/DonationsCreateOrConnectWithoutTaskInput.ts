import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsCreateWithoutTaskInput } from "../inputs/DonationsCreateWithoutTaskInput";
import { DonationsWhereUniqueInput } from "../inputs/DonationsWhereUniqueInput";

@TypeGraphQL.InputType("DonationsCreateOrConnectWithoutTaskInput", {
  isAbstract: true
})
export class DonationsCreateOrConnectWithoutTaskInput {
  @TypeGraphQL.Field(_type => DonationsWhereUniqueInput, {
    nullable: false
  })
  where!: DonationsWhereUniqueInput;

  @TypeGraphQL.Field(_type => DonationsCreateWithoutTaskInput, {
    nullable: false
  })
  create!: DonationsCreateWithoutTaskInput;
}
