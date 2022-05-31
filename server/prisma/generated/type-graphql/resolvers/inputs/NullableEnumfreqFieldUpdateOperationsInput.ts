import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { freq } from "../../enums/freq";

@TypeGraphQL.InputType("NullableEnumfreqFieldUpdateOperationsInput", {
  isAbstract: true
})
export class NullableEnumfreqFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => freq, {
    nullable: true
  })
  set?: "one_time" | "weekly" | "monthly" | "yearly" | undefined;
}
