import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersCreateOrConnectWithoutTicketsInput } from "../inputs/CustomersCreateOrConnectWithoutTicketsInput";
import { CustomersCreateWithoutTicketsInput } from "../inputs/CustomersCreateWithoutTicketsInput";
import { CustomersUpdateWithoutTicketsInput } from "../inputs/CustomersUpdateWithoutTicketsInput";
import { CustomersUpsertWithoutTicketsInput } from "../inputs/CustomersUpsertWithoutTicketsInput";
import { CustomersWhereUniqueInput } from "../inputs/CustomersWhereUniqueInput";

@TypeGraphQL.InputType("CustomersUpdateOneWithoutTicketsInput", {
  isAbstract: true
})
export class CustomersUpdateOneWithoutTicketsInput {
  @TypeGraphQL.Field(_type => CustomersCreateWithoutTicketsInput, {
    nullable: true
  })
  create?: CustomersCreateWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => CustomersCreateOrConnectWithoutTicketsInput, {
    nullable: true
  })
  connectOrCreate?: CustomersCreateOrConnectWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => CustomersUpsertWithoutTicketsInput, {
    nullable: true
  })
  upsert?: CustomersUpsertWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => CustomersWhereUniqueInput, {
    nullable: true
  })
  connect?: CustomersWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => CustomersUpdateWithoutTicketsInput, {
    nullable: true
  })
  update?: CustomersUpdateWithoutTicketsInput | undefined;
}
