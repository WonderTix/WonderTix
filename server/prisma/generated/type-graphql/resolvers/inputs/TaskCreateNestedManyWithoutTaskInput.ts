import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyTaskInputEnvelope } from "../inputs/TaskCreateManyTaskInputEnvelope";
import { TaskCreateOrConnectWithoutTaskInput } from "../inputs/TaskCreateOrConnectWithoutTaskInput";
import { TaskCreateWithoutTaskInput } from "../inputs/TaskCreateWithoutTaskInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateNestedManyWithoutTaskInput", {
  isAbstract: true
})
export class TaskCreateNestedManyWithoutTaskInput {
  @TypeGraphQL.Field(_type => [TaskCreateWithoutTaskInput], {
    nullable: true
  })
  create?: TaskCreateWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskCreateOrConnectWithoutTaskInput], {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => TaskCreateManyTaskInputEnvelope, {
    nullable: true
  })
  createMany?: TaskCreateManyTaskInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  connect?: TaskWhereUniqueInput[] | undefined;
}
