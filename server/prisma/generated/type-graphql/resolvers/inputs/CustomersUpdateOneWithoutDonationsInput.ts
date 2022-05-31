import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersCreateOrConnectWithoutDonationsInput } from "../inputs/CustomersCreateOrConnectWithoutDonationsInput";
import { CustomersCreateWithoutDonationsInput } from "../inputs/CustomersCreateWithoutDonationsInput";
import { CustomersUpdateWithoutDonationsInput } from "../inputs/CustomersUpdateWithoutDonationsInput";
import { CustomersUpsertWithoutDonationsInput } from "../inputs/CustomersUpsertWithoutDonationsInput";
import { CustomersWhereUniqueInput } from "../inputs/CustomersWhereUniqueInput";

@TypeGraphQL.InputType("CustomersUpdateOneWithoutDonationsInput", {
  isAbstract: true
})
export class CustomersUpdateOneWithoutDonationsInput {
  @TypeGraphQL.Field(_type => CustomersCreateWithoutDonationsInput, {
    nullable: true
  })
  create?: CustomersCreateWithoutDonationsInput | undefined;

  @TypeGraphQL.Field(_type => CustomersCreateOrConnectWithoutDonationsInput, {
    nullable: true
  })
  connectOrCreate?: CustomersCreateOrConnectWithoutDonationsInput | undefined;

  @TypeGraphQL.Field(_type => CustomersUpsertWithoutDonationsInput, {
    nullable: true
  })
  upsert?: CustomersUpsertWithoutDonationsInput | undefined;

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

  @TypeGraphQL.Field(_type => CustomersUpdateWithoutDonationsInput, {
    nullable: true
  })
  update?: CustomersUpdateWithoutDonationsInput | undefined;
}
