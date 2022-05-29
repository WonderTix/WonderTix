import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationCreateWithoutCustomersInput } from "../inputs/ReservationCreateWithoutCustomersInput";
import { ReservationWhereUniqueInput } from "../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.InputType("ReservationCreateOrConnectWithoutCustomersInput", {
  isAbstract: true
})
export class ReservationCreateOrConnectWithoutCustomersInput {
  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: false
  })
  where!: ReservationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReservationCreateWithoutCustomersInput, {
    nullable: false
  })
  create!: ReservationCreateWithoutCustomersInput;
}
