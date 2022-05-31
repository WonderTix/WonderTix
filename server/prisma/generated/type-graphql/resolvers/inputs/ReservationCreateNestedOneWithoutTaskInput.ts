import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationCreateOrConnectWithoutTaskInput } from "../inputs/ReservationCreateOrConnectWithoutTaskInput";
import { ReservationCreateWithoutTaskInput } from "../inputs/ReservationCreateWithoutTaskInput";
import { ReservationWhereUniqueInput } from "../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.InputType("ReservationCreateNestedOneWithoutTaskInput", {
  isAbstract: true
})
export class ReservationCreateNestedOneWithoutTaskInput {
  @TypeGraphQL.Field(_type => ReservationCreateWithoutTaskInput, {
    nullable: true
  })
  create?: ReservationCreateWithoutTaskInput | undefined;

  @TypeGraphQL.Field(_type => ReservationCreateOrConnectWithoutTaskInput, {
    nullable: true
  })
  connectOrCreate?: ReservationCreateOrConnectWithoutTaskInput | undefined;

  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: true
  })
  connect?: ReservationWhereUniqueInput | undefined;
}
