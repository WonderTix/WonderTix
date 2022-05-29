import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsAvgAggregate } from "../outputs/DonationsAvgAggregate";
import { DonationsCountAggregate } from "../outputs/DonationsCountAggregate";
import { DonationsMaxAggregate } from "../outputs/DonationsMaxAggregate";
import { DonationsMinAggregate } from "../outputs/DonationsMinAggregate";
import { DonationsSumAggregate } from "../outputs/DonationsSumAggregate";

@TypeGraphQL.ObjectType("AggregateDonations", {
  isAbstract: true
})
export class AggregateDonations {
  @TypeGraphQL.Field(_type => DonationsCountAggregate, {
    nullable: true
  })
  _count!: DonationsCountAggregate | null;

  @TypeGraphQL.Field(_type => DonationsAvgAggregate, {
    nullable: true
  })
  _avg!: DonationsAvgAggregate | null;

  @TypeGraphQL.Field(_type => DonationsSumAggregate, {
    nullable: true
  })
  _sum!: DonationsSumAggregate | null;

  @TypeGraphQL.Field(_type => DonationsMinAggregate, {
    nullable: true
  })
  _min!: DonationsMinAggregate | null;

  @TypeGraphQL.Field(_type => DonationsMaxAggregate, {
    nullable: true
  })
  _max!: DonationsMaxAggregate | null;
}
