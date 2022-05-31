import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("EventsMaxAggregate", {
  isAbstract: true
})
export class EventsMaxAggregate {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  id!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  seasonid!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  eventname!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  eventdescription!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  active!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image_url!: string | null;
}
