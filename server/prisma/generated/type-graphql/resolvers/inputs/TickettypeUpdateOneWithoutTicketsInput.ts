import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateOrConnectWithoutTicketsInput } from "../inputs/TickettypeCreateOrConnectWithoutTicketsInput";
import { TickettypeCreateWithoutTicketsInput } from "../inputs/TickettypeCreateWithoutTicketsInput";
import { TickettypeUpdateWithoutTicketsInput } from "../inputs/TickettypeUpdateWithoutTicketsInput";
import { TickettypeUpsertWithoutTicketsInput } from "../inputs/TickettypeUpsertWithoutTicketsInput";
import { TickettypeWhereUniqueInput } from "../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.InputType("TickettypeUpdateOneWithoutTicketsInput", {
  isAbstract: true
})
export class TickettypeUpdateOneWithoutTicketsInput {
  @TypeGraphQL.Field(_type => TickettypeCreateWithoutTicketsInput, {
    nullable: true
  })
  create?: TickettypeCreateWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeCreateOrConnectWithoutTicketsInput, {
    nullable: true
  })
  connectOrCreate?: TickettypeCreateOrConnectWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeUpsertWithoutTicketsInput, {
    nullable: true
  })
  upsert?: TickettypeUpsertWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: true
  })
  connect?: TickettypeWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeUpdateWithoutTicketsInput, {
    nullable: true
  })
  update?: TickettypeUpdateWithoutTicketsInput | undefined;
}
