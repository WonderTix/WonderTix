import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationUpdateWithoutCustomersInput } from "../inputs/ReservationUpdateWithoutCustomersInput";
import { ReservationWhereUniqueInput } from "../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.InputType("ReservationUpdateWithWhereUniqueWithoutCustomersInput", {
  isAbstract: true
})
export class ReservationUpdateWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: false
  })
  where!: ReservationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReservationUpdateWithoutCustomersInput, {
    nullable: false
  })
  data!: ReservationUpdateWithoutCustomersInput;
}
