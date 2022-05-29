import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomersWhereUniqueInput } from "../../../inputs/CustomersWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueCustomersArgs {
  @TypeGraphQL.Field(_type => CustomersWhereUniqueInput, {
    nullable: false
  })
  where!: CustomersWhereUniqueInput;
}
