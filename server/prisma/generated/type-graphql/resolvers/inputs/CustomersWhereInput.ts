import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { BoolNullableFilter } from "../inputs/BoolNullableFilter";
import { DonationsListRelationFilter } from "../inputs/DonationsListRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { ReservationListRelationFilter } from "../inputs/ReservationListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TaskListRelationFilter } from "../inputs/TaskListRelationFilter";
import { TicketsListRelationFilter } from "../inputs/TicketsListRelationFilter";

@TypeGraphQL.InputType("CustomersWhereInput", {
  isAbstract: true
})
export class CustomersWhereInput {
  @TypeGraphQL.Field(_type => [CustomersWhereInput], {
    nullable: true
  })
  AND?: CustomersWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [CustomersWhereInput], {
    nullable: true
  })
  OR?: CustomersWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [CustomersWhereInput], {
    nullable: true
  })
  NOT?: CustomersWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  custname?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  email?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  phone?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  custaddress?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  newsletter?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  donorbadge?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  seatingaccom?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  vip?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolFilter, {
    nullable: true
  })
  volunteer_list?: BoolFilter | undefined;

  @TypeGraphQL.Field(_type => DonationsListRelationFilter, {
    nullable: true
  })
  donations?: DonationsListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ReservationListRelationFilter, {
    nullable: true
  })
  reservation?: ReservationListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => TaskListRelationFilter, {
    nullable: true
  })
  task?: TaskListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => TicketsListRelationFilter, {
    nullable: true
  })
  tickets?: TicketsListRelationFilter | undefined;
}
