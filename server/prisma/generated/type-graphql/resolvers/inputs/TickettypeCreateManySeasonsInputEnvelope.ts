import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateManySeasonsInput } from "../inputs/TickettypeCreateManySeasonsInput";

@TypeGraphQL.InputType("TickettypeCreateManySeasonsInputEnvelope", {
  isAbstract: true
})
export class TickettypeCreateManySeasonsInputEnvelope {
  @TypeGraphQL.Field(_type => [TickettypeCreateManySeasonsInput], {
    nullable: false
  })
  data!: TickettypeCreateManySeasonsInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
