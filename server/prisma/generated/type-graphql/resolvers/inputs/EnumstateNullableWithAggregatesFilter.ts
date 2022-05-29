import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumstateNullableFilter } from "../inputs/NestedEnumstateNullableFilter";
import { NestedEnumstateNullableWithAggregatesFilter } from "../inputs/NestedEnumstateNullableWithAggregatesFilter";
import { NestedIntNullableFilter } from "../inputs/NestedIntNullableFilter";
import { state } from "../../enums/state";

@TypeGraphQL.InputType("EnumstateNullableWithAggregatesFilter", {
  isAbstract: true
})
export class EnumstateNullableWithAggregatesFilter {
  @TypeGraphQL.Field(_type => state, {
    nullable: true
  })
  equals?: "not_started" | "in_progress" | "completed" | undefined;

  @TypeGraphQL.Field(_type => [state], {
    nullable: true
  })
  in?: Array<"not_started" | "in_progress" | "completed"> | undefined;

  @TypeGraphQL.Field(_type => [state], {
    nullable: true
  })
  notIn?: Array<"not_started" | "in_progress" | "completed"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumstateNullableWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumstateNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntNullableFilter, {
    nullable: true
  })
  _count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumstateNullableFilter, {
    nullable: true
  })
  _min?: NestedEnumstateNullableFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumstateNullableFilter, {
    nullable: true
  })
  _max?: NestedEnumstateNullableFilter | undefined;
}
