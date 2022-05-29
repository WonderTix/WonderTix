import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationWhereInput } from "../inputs/ReservationWhereInput";

@TypeGraphQL.InputType("ReservationRelationFilter", {
  isAbstract: true
})
export class ReservationRelationFilter {
  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  is?: ReservationWhereInput | undefined;

  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  isNot?: ReservationWhereInput | undefined;
}
