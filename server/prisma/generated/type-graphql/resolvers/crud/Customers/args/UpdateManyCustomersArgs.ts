import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomersUpdateManyMutationInput } from "../../../inputs/CustomersUpdateManyMutationInput";
import { CustomersWhereInput } from "../../../inputs/CustomersWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyCustomersArgs {
  @TypeGraphQL.Field(_type => CustomersUpdateManyMutationInput, {
    nullable: false
  })
  data!: CustomersUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => CustomersWhereInput, {
    nullable: true
  })
  where?: CustomersWhereInput | undefined;
}
