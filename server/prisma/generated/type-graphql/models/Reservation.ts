import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Customers } from "../models/Customers";
import { Task } from "../models/Task";
import { ReservationCount } from "../resolvers/outputs/ReservationCount";

@TypeGraphQL.ObjectType("Reservation", {
  isAbstract: true
})
export class Reservation {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  transno!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  custid?: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  eventid?: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  eventname?: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  eventdate?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  showtime?: Date | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  numtickets?: number | null;

  customers?: Customers | null;

  task?: Task[];

  @TypeGraphQL.Field(_type => ReservationCount, {
    nullable: true
  })
  _count?: ReservationCount | null;
}
