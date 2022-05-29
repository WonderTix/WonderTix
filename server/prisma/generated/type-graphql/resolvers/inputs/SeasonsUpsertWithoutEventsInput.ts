import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsCreateWithoutEventsInput } from "../inputs/SeasonsCreateWithoutEventsInput";
import { SeasonsUpdateWithoutEventsInput } from "../inputs/SeasonsUpdateWithoutEventsInput";

@TypeGraphQL.InputType("SeasonsUpsertWithoutEventsInput", {
  isAbstract: true
})
export class SeasonsUpsertWithoutEventsInput {
  @TypeGraphQL.Field(_type => SeasonsUpdateWithoutEventsInput, {
    nullable: false
  })
  update!: SeasonsUpdateWithoutEventsInput;

  @TypeGraphQL.Field(_type => SeasonsCreateWithoutEventsInput, {
    nullable: false
  })
  create!: SeasonsCreateWithoutEventsInput;
}
