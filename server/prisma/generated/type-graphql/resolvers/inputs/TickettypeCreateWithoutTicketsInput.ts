import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateNestedManyWithoutTickettypeInput } from "../inputs/LinkedticketsCreateNestedManyWithoutTickettypeInput";
import { SeasonsCreateNestedOneWithoutTickettypeInput } from "../inputs/SeasonsCreateNestedOneWithoutTickettypeInput";

@TypeGraphQL.InputType("TickettypeCreateWithoutTicketsInput", {
  isAbstract: true
})
export class TickettypeCreateWithoutTicketsInput {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isseason?: boolean | undefined;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  price?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  concessions?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field(_type => SeasonsCreateNestedOneWithoutTickettypeInput, {
    nullable: true
  })
  seasons?: SeasonsCreateNestedOneWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsCreateNestedManyWithoutTickettypeInput, {
    nullable: true
  })
  linkedtickets?: LinkedticketsCreateNestedManyWithoutTickettypeInput | undefined;
}
