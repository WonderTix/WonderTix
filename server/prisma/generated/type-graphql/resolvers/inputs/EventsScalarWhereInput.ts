import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolNullableFilter } from "../inputs/BoolNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("EventsScalarWhereInput", {
  isAbstract: true
})
export class EventsScalarWhereInput {
  @TypeGraphQL.Field(_type => [EventsScalarWhereInput], {
    nullable: true
  })
  AND?: EventsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsScalarWhereInput], {
    nullable: true
  })
  OR?: EventsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsScalarWhereInput], {
    nullable: true
  })
  NOT?: EventsScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  seasonid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  eventname?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  eventdescription?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  active?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  image_url?: StringNullableFilter | undefined;
}
