import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersCreateOrConnectWithoutReservationInput } from "../inputs/CustomersCreateOrConnectWithoutReservationInput";
import { CustomersCreateWithoutReservationInput } from "../inputs/CustomersCreateWithoutReservationInput";
import { CustomersWhereUniqueInput } from "../inputs/CustomersWhereUniqueInput";

@TypeGraphQL.InputType("CustomersCreateNestedOneWithoutReservationInput", {
  isAbstract: true
})
export class CustomersCreateNestedOneWithoutReservationInput {
  @TypeGraphQL.Field(_type => CustomersCreateWithoutReservationInput, {
    nullable: true
  })
  create?: CustomersCreateWithoutReservationInput | undefined;

  @TypeGraphQL.Field(_type => CustomersCreateOrConnectWithoutReservationInput, {
    nullable: true
  })
  connectOrCreate?: CustomersCreateOrConnectWithoutReservationInput | undefined;

  @TypeGraphQL.Field(_type => CustomersWhereUniqueInput, {
    nullable: true
  })
  connect?: CustomersWhereUniqueInput | undefined;
}
