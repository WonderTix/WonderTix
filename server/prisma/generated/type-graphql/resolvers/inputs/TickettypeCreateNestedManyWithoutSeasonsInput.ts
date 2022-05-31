import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateManySeasonsInputEnvelope } from "../inputs/TickettypeCreateManySeasonsInputEnvelope";
import { TickettypeCreateOrConnectWithoutSeasonsInput } from "../inputs/TickettypeCreateOrConnectWithoutSeasonsInput";
import { TickettypeCreateWithoutSeasonsInput } from "../inputs/TickettypeCreateWithoutSeasonsInput";
import { TickettypeWhereUniqueInput } from "../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.InputType("TickettypeCreateNestedManyWithoutSeasonsInput", {
  isAbstract: true
})
export class TickettypeCreateNestedManyWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => [TickettypeCreateWithoutSeasonsInput], {
    nullable: true
  })
  create?: TickettypeCreateWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => [TickettypeCreateOrConnectWithoutSeasonsInput], {
    nullable: true
  })
  connectOrCreate?: TickettypeCreateOrConnectWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => TickettypeCreateManySeasonsInputEnvelope, {
    nullable: true
  })
  createMany?: TickettypeCreateManySeasonsInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TickettypeWhereUniqueInput], {
    nullable: true
  })
  connect?: TickettypeWhereUniqueInput[] | undefined;
}
