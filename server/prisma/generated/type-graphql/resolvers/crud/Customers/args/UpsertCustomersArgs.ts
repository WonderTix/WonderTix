import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomersCreateInput } from "../../../inputs/CustomersCreateInput";
import { CustomersUpdateInput } from "../../../inputs/CustomersUpdateInput";
import { CustomersWhereUniqueInput } from "../../../inputs/CustomersWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertCustomersArgs {
  @TypeGraphQL.Field(_type => CustomersWhereUniqueInput, {
    nullable: false
  })
  where!: CustomersWhereUniqueInput;

  @TypeGraphQL.Field(_type => CustomersCreateInput, {
    nullable: false
  })
  create!: CustomersCreateInput;

  @TypeGraphQL.Field(_type => CustomersUpdateInput, {
    nullable: false
  })
  update!: CustomersUpdateInput;
}
