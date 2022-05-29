import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesRelationFilter } from "../inputs/Event_instancesRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TickettypeRelationFilter } from "../inputs/TickettypeRelationFilter";

@TypeGraphQL.InputType("LinkedticketsWhereInput", {
  isAbstract: true
})
export class LinkedticketsWhereInput {
  @TypeGraphQL.Field(_type => [LinkedticketsWhereInput], {
    nullable: true
  })
  AND?: LinkedticketsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereInput], {
    nullable: true
  })
  OR?: LinkedticketsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereInput], {
    nullable: true
  })
  NOT?: LinkedticketsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  event_instance_id?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  ticket_type?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  dummy?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => Event_instancesRelationFilter, {
    nullable: true
  })
  event_instances?: Event_instancesRelationFilter | undefined;

  @TypeGraphQL.Field(_type => TickettypeRelationFilter, {
    nullable: true
  })
  tickettype?: TickettypeRelationFilter | undefined;
}
