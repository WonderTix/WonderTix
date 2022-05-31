import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateNestedManyWithoutSeasonsInput } from "../inputs/TickettypeCreateNestedManyWithoutSeasonsInput";

@TypeGraphQL.InputType("SeasonsCreateWithoutEventsInput", {
  isAbstract: true
})
export class SeasonsCreateWithoutEventsInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startdate?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  enddate?: Date | undefined;

  @TypeGraphQL.Field(_type => TickettypeCreateNestedManyWithoutSeasonsInput, {
    nullable: true
  })
  tickettype?: TickettypeCreateNestedManyWithoutSeasonsInput | undefined;
}
