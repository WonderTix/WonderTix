import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolNullableFilter } from "../inputs/BoolNullableFilter";
import { CustomersRelationFilter } from "../inputs/CustomersRelationFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { Event_instancesRelationFilter } from "../inputs/Event_instancesRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TickettypeRelationFilter } from "../inputs/TickettypeRelationFilter";

@TypeGraphQL.InputType("TicketsWhereInput", {
  isAbstract: true
})
export class TicketsWhereInput {
  @TypeGraphQL.Field(_type => [TicketsWhereInput], {
    nullable: true
  })
  AND?: TicketsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereInput], {
    nullable: true
  })
  OR?: TicketsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereInput], {
    nullable: true
  })
  NOT?: TicketsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  ticketno?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  type?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  eventinstanceid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  custid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  paid?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  active?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  checkedin?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  checkedin_ts?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  payment_intent?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  comments?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => CustomersRelationFilter, {
    nullable: true
  })
  customers?: CustomersRelationFilter | undefined;

  @TypeGraphQL.Field(_type => Event_instancesRelationFilter, {
    nullable: true
  })
  event_instances?: Event_instancesRelationFilter | undefined;

  @TypeGraphQL.Field(_type => TickettypeRelationFilter, {
    nullable: true
  })
  tickettype?: TickettypeRelationFilter | undefined;
}
