import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationWhereInput } from "../inputs/ReservationWhereInput";

@TypeGraphQL.InputType("ReservationListRelationFilter", {
  isAbstract: true
})
export class ReservationListRelationFilter {
  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  every?: ReservationWhereInput | undefined;

  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  some?: ReservationWhereInput | undefined;

  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  none?: ReservationWhereInput | undefined;
}
