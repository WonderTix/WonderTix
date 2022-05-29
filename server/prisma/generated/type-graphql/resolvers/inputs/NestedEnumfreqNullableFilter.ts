import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { freq } from "../../enums/freq";

@TypeGraphQL.InputType("NestedEnumfreqNullableFilter", {
  isAbstract: true
})
export class NestedEnumfreqNullableFilter {
  @TypeGraphQL.Field(_type => freq, {
    nullable: true
  })
  equals?: "one_time" | "weekly" | "monthly" | "yearly" | undefined;

  @TypeGraphQL.Field(_type => [freq], {
    nullable: true
  })
  in?: Array<"one_time" | "weekly" | "monthly" | "yearly"> | undefined;

  @TypeGraphQL.Field(_type => [freq], {
    nullable: true
  })
  notIn?: Array<"one_time" | "weekly" | "monthly" | "yearly"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumfreqNullableFilter, {
    nullable: true
  })
  not?: NestedEnumfreqNullableFilter | undefined;
}
