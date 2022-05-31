import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Events } from "../models/Events";
import { Tickettype } from "../models/Tickettype";
import { SeasonsCount } from "../resolvers/outputs/SeasonsCount";

@TypeGraphQL.ObjectType("Seasons", {
  isAbstract: true
})
export class Seasons {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startdate?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  enddate?: Date | null;

  events?: Events[];

  tickettype?: Tickettype[];

  @TypeGraphQL.Field(_type => SeasonsCount, {
    nullable: true
  })
  _count?: SeasonsCount | null;
}
