import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsCreateWithoutTickettypeInput } from "../inputs/SeasonsCreateWithoutTickettypeInput";
import { SeasonsUpdateWithoutTickettypeInput } from "../inputs/SeasonsUpdateWithoutTickettypeInput";

@TypeGraphQL.InputType("SeasonsUpsertWithoutTickettypeInput", {
  isAbstract: true
})
export class SeasonsUpsertWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => SeasonsUpdateWithoutTickettypeInput, {
    nullable: false
  })
  update!: SeasonsUpdateWithoutTickettypeInput;

  @TypeGraphQL.Field(_type => SeasonsCreateWithoutTickettypeInput, {
    nullable: false
  })
  create!: SeasonsCreateWithoutTickettypeInput;
}
