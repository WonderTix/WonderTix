import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutDonationsInput } from "../inputs/TaskCreateWithoutDonationsInput";
import { TaskUpdateWithoutDonationsInput } from "../inputs/TaskUpdateWithoutDonationsInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpsertWithWhereUniqueWithoutDonationsInput", {
  isAbstract: true
})
export class TaskUpsertWithWhereUniqueWithoutDonationsInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutDonationsInput, {
    nullable: false
  })
  update!: TaskUpdateWithoutDonationsInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutDonationsInput, {
    nullable: false
  })
  create!: TaskCreateWithoutDonationsInput;
}
