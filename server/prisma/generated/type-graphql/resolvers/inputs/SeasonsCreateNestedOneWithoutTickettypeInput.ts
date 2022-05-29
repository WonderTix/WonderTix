import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsCreateOrConnectWithoutTickettypeInput } from "../inputs/SeasonsCreateOrConnectWithoutTickettypeInput";
import { SeasonsCreateWithoutTickettypeInput } from "../inputs/SeasonsCreateWithoutTickettypeInput";
import { SeasonsWhereUniqueInput } from "../inputs/SeasonsWhereUniqueInput";

@TypeGraphQL.InputType("SeasonsCreateNestedOneWithoutTickettypeInput", {
  isAbstract: true
})
export class SeasonsCreateNestedOneWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => SeasonsCreateWithoutTickettypeInput, {
    nullable: true
  })
  create?: SeasonsCreateWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsCreateOrConnectWithoutTickettypeInput, {
    nullable: true
  })
  connectOrCreate?: SeasonsCreateOrConnectWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsWhereUniqueInput, {
    nullable: true
  })
  connect?: SeasonsWhereUniqueInput | undefined;
}
