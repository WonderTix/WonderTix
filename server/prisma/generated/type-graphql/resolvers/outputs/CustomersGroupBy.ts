import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersAvgAggregate } from "../outputs/CustomersAvgAggregate";
import { CustomersCountAggregate } from "../outputs/CustomersCountAggregate";
import { CustomersMaxAggregate } from "../outputs/CustomersMaxAggregate";
import { CustomersMinAggregate } from "../outputs/CustomersMinAggregate";
import { CustomersSumAggregate } from "../outputs/CustomersSumAggregate";

@TypeGraphQL.ObjectType("CustomersGroupBy", {
  isAbstract: true
})
export class CustomersGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  custname!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  phone!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  custaddress!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  newsletter!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  donorbadge!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  seatingaccom!: boolean | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  vip!: boolean | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  volunteer_list!: boolean;

  @TypeGraphQL.Field(_type => CustomersCountAggregate, {
    nullable: true
  })
  _count!: CustomersCountAggregate | null;

  @TypeGraphQL.Field(_type => CustomersAvgAggregate, {
    nullable: true
  })
  _avg!: CustomersAvgAggregate | null;

  @TypeGraphQL.Field(_type => CustomersSumAggregate, {
    nullable: true
  })
  _sum!: CustomersSumAggregate | null;

  @TypeGraphQL.Field(_type => CustomersMinAggregate, {
    nullable: true
  })
  _min!: CustomersMinAggregate | null;

  @TypeGraphQL.Field(_type => CustomersMaxAggregate, {
    nullable: true
  })
  _max!: CustomersMaxAggregate | null;
}
