import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateManyEvent_instancesInput } from "../inputs/LinkedticketsCreateManyEvent_instancesInput";

@TypeGraphQL.InputType("LinkedticketsCreateManyEvent_instancesInputEnvelope", {
  isAbstract: true
})
export class LinkedticketsCreateManyEvent_instancesInputEnvelope {
  @TypeGraphQL.Field(_type => [LinkedticketsCreateManyEvent_instancesInput], {
    nullable: false
  })
  data!: LinkedticketsCreateManyEvent_instancesInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
