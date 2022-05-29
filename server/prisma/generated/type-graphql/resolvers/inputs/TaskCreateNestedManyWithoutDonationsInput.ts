import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyDonationsInputEnvelope } from "../inputs/TaskCreateManyDonationsInputEnvelope";
import { TaskCreateOrConnectWithoutDonationsInput } from "../inputs/TaskCreateOrConnectWithoutDonationsInput";
import { TaskCreateWithoutDonationsInput } from "../inputs/TaskCreateWithoutDonationsInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateNestedManyWithoutDonationsInput", {
  isAbstract: true
})
export class TaskCreateNestedManyWithoutDonationsInput {
  @TypeGraphQL.Field(_type => [TaskCreateWithoutDonationsInput], {
    nullable: true
  })
  create?: TaskCreateWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskCreateOrConnectWithoutDonationsInput], {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field(_type => TaskCreateManyDonationsInputEnvelope, {
    nullable: true
  })
  createMany?: TaskCreateManyDonationsInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  connect?: TaskWhereUniqueInput[] | undefined;
}
