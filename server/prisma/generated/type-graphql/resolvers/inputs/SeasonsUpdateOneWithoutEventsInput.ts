import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsCreateOrConnectWithoutEventsInput } from "../inputs/SeasonsCreateOrConnectWithoutEventsInput";
import { SeasonsCreateWithoutEventsInput } from "../inputs/SeasonsCreateWithoutEventsInput";
import { SeasonsUpdateWithoutEventsInput } from "../inputs/SeasonsUpdateWithoutEventsInput";
import { SeasonsUpsertWithoutEventsInput } from "../inputs/SeasonsUpsertWithoutEventsInput";
import { SeasonsWhereUniqueInput } from "../inputs/SeasonsWhereUniqueInput";

@TypeGraphQL.InputType("SeasonsUpdateOneWithoutEventsInput", {
  isAbstract: true
})
export class SeasonsUpdateOneWithoutEventsInput {
  @TypeGraphQL.Field(_type => SeasonsCreateWithoutEventsInput, {
    nullable: true
  })
  create?: SeasonsCreateWithoutEventsInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsCreateOrConnectWithoutEventsInput, {
    nullable: true
  })
  connectOrCreate?: SeasonsCreateOrConnectWithoutEventsInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsUpsertWithoutEventsInput, {
    nullable: true
  })
  upsert?: SeasonsUpsertWithoutEventsInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => SeasonsWhereUniqueInput, {
    nullable: true
  })
  connect?: SeasonsWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsUpdateWithoutEventsInput, {
    nullable: true
  })
  update?: SeasonsUpdateWithoutEventsInput | undefined;
}
