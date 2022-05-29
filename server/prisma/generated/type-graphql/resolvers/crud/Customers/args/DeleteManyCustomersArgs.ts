import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomersWhereInput } from "../../../inputs/CustomersWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyCustomersArgs {
  @TypeGraphQL.Field(_type => CustomersWhereInput, {
    nullable: true
  })
  where?: CustomersWhereInput | undefined;
}
