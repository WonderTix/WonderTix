import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsCreateWithoutTickettypeInput } from "../inputs/SeasonsCreateWithoutTickettypeInput";
import { SeasonsWhereUniqueInput } from "../inputs/SeasonsWhereUniqueInput";

@TypeGraphQL.InputType("SeasonsCreateOrConnectWithoutTickettypeInput", {
  isAbstract: true
})
export class SeasonsCreateOrConnectWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => SeasonsWhereUniqueInput, {
    nullable: false
  })
  where!: SeasonsWhereUniqueInput;

  @TypeGraphQL.Field(_type => SeasonsCreateWithoutTickettypeInput, {
    nullable: false
  })
  create!: SeasonsCreateWithoutTickettypeInput;
}
