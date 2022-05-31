import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomersCreateManyInput } from "../../../inputs/CustomersCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyCustomersArgs {
  @TypeGraphQL.Field(_type => [CustomersCreateManyInput], {
    nullable: false
  })
  data!: CustomersCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
