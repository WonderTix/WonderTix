import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesOrderByWithRelationInput } from "../inputs/Event_instancesOrderByWithRelationInput";
import { TickettypeOrderByWithRelationInput } from "../inputs/TickettypeOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LinkedticketsOrderByWithRelationInput", {
  isAbstract: true
})
export class LinkedticketsOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  event_instance_id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  ticket_type?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dummy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => Event_instancesOrderByWithRelationInput, {
    nullable: true
  })
  event_instances?: Event_instancesOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeOrderByWithRelationInput, {
    nullable: true
  })
  tickettype?: TickettypeOrderByWithRelationInput | undefined;
}
