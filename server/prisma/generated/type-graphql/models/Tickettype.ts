import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Linkedtickets } from "../models/Linkedtickets";
import { Seasons } from "../models/Seasons";
import { Tickets } from "../models/Tickets";
import { TickettypeCount } from "../resolvers/outputs/TickettypeCount";

@TypeGraphQL.ObjectType("Tickettype", {
  isAbstract: true
})
export class Tickettype {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isseason?: boolean | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  seasonid?: number | null;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  price?: Prisma.Decimal | null;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  concessions?: Prisma.Decimal | null;

  seasons?: Seasons | null;

  linkedtickets?: Linkedtickets[];

  tickets?: Tickets[];

  @TypeGraphQL.Field(_type => TickettypeCount, {
    nullable: true
  })
  _count?: TickettypeCount | null;
}
