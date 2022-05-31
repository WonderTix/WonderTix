import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { EventsListRelationFilter } from "../inputs/EventsListRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TickettypeListRelationFilter } from "../inputs/TickettypeListRelationFilter";

@TypeGraphQL.InputType("SeasonsWhereInput", {
  isAbstract: true
})
export class SeasonsWhereInput {
  @TypeGraphQL.Field(_type => [SeasonsWhereInput], {
    nullable: true
  })
  AND?: SeasonsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [SeasonsWhereInput], {
    nullable: true
  })
  OR?: SeasonsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [SeasonsWhereInput], {
    nullable: true
  })
  NOT?: SeasonsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  startdate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  enddate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => EventsListRelationFilter, {
    nullable: true
  })
  events?: EventsListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => TickettypeListRelationFilter, {
    nullable: true
  })
  tickettype?: TickettypeListRelationFilter | undefined;
}
