import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { freq } from "../../enums/freq";

@TypeGraphQL.ObjectType("DonationsMaxAggregate", {
  isAbstract: true
})
export class DonationsMaxAggregate {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  id!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  donorid!: number | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isanonymous!: boolean | null;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  amount!: Prisma.Decimal | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  dononame!: string | null;

  @TypeGraphQL.Field(_type => freq, {
    nullable: true
  })
  frequency!: "one_time" | "weekly" | "monthly" | "yearly" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comments!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  donodate!: Date | null;
}
