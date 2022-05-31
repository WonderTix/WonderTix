import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolNullableFilter } from "../inputs/BoolNullableFilter";
import { DecimalNullableFilter } from "../inputs/DecimalNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { LinkedticketsListRelationFilter } from "../inputs/LinkedticketsListRelationFilter";
import { SeasonsRelationFilter } from "../inputs/SeasonsRelationFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TicketsListRelationFilter } from "../inputs/TicketsListRelationFilter";

@TypeGraphQL.InputType("TickettypeWhereInput", {
  isAbstract: true
})
export class TickettypeWhereInput {
  @TypeGraphQL.Field(_type => [TickettypeWhereInput], {
    nullable: true
  })
  AND?: TickettypeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TickettypeWhereInput], {
    nullable: true
  })
  OR?: TickettypeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TickettypeWhereInput], {
    nullable: true
  })
  NOT?: TickettypeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  isseason?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  seasonid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DecimalNullableFilter, {
    nullable: true
  })
  price?: DecimalNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DecimalNullableFilter, {
    nullable: true
  })
  concessions?: DecimalNullableFilter | undefined;

  @TypeGraphQL.Field(_type => SeasonsRelationFilter, {
    nullable: true
  })
  seasons?: SeasonsRelationFilter | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsListRelationFilter, {
    nullable: true
  })
  linkedtickets?: LinkedticketsListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => TicketsListRelationFilter, {
    nullable: true
  })
  tickets?: TicketsListRelationFilter | undefined;
}
