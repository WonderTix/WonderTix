import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationCreateWithoutCustomersInput } from "../inputs/ReservationCreateWithoutCustomersInput";
import { ReservationUpdateWithoutCustomersInput } from "../inputs/ReservationUpdateWithoutCustomersInput";
import { ReservationWhereUniqueInput } from "../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.InputType("ReservationUpsertWithWhereUniqueWithoutCustomersInput", {
  isAbstract: true
})
export class ReservationUpsertWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: false
  })
  where!: ReservationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReservationUpdateWithoutCustomersInput, {
    nullable: false
  })
  update!: ReservationUpdateWithoutCustomersInput;

  @TypeGraphQL.Field(_type => ReservationCreateWithoutCustomersInput, {
    nullable: false
  })
  create!: ReservationCreateWithoutCustomersInput;
}
