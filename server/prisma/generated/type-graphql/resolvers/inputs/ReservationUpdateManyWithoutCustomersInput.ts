import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationCreateManyCustomersInputEnvelope } from "../inputs/ReservationCreateManyCustomersInputEnvelope";
import { ReservationCreateOrConnectWithoutCustomersInput } from "../inputs/ReservationCreateOrConnectWithoutCustomersInput";
import { ReservationCreateWithoutCustomersInput } from "../inputs/ReservationCreateWithoutCustomersInput";
import { ReservationScalarWhereInput } from "../inputs/ReservationScalarWhereInput";
import { ReservationUpdateManyWithWhereWithoutCustomersInput } from "../inputs/ReservationUpdateManyWithWhereWithoutCustomersInput";
import { ReservationUpdateWithWhereUniqueWithoutCustomersInput } from "../inputs/ReservationUpdateWithWhereUniqueWithoutCustomersInput";
import { ReservationUpsertWithWhereUniqueWithoutCustomersInput } from "../inputs/ReservationUpsertWithWhereUniqueWithoutCustomersInput";
import { ReservationWhereUniqueInput } from "../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.InputType("ReservationUpdateManyWithoutCustomersInput", {
  isAbstract: true
})
export class ReservationUpdateManyWithoutCustomersInput {
  @TypeGraphQL.Field(_type => [ReservationCreateWithoutCustomersInput], {
    nullable: true
  })
  create?: ReservationCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationCreateOrConnectWithoutCustomersInput], {
    nullable: true
  })
  connectOrCreate?: ReservationCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationUpsertWithWhereUniqueWithoutCustomersInput], {
    nullable: true
  })
  upsert?: ReservationUpsertWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field(_type => ReservationCreateManyCustomersInputEnvelope, {
    nullable: true
  })
  createMany?: ReservationCreateManyCustomersInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ReservationWhereUniqueInput], {
    nullable: true
  })
  set?: ReservationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ReservationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationWhereUniqueInput], {
    nullable: true
  })
  delete?: ReservationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationWhereUniqueInput], {
    nullable: true
  })
  connect?: ReservationWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationUpdateWithWhereUniqueWithoutCustomersInput], {
    nullable: true
  })
  update?: ReservationUpdateWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationUpdateManyWithWhereWithoutCustomersInput], {
    nullable: true
  })
  updateMany?: ReservationUpdateManyWithWhereWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReservationScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ReservationScalarWhereInput[] | undefined;
}
