import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskUpdateWithoutDonationsInput } from "../inputs/TaskUpdateWithoutDonationsInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateWithWhereUniqueWithoutDonationsInput", {
  isAbstract: true
})
export class TaskUpdateWithWhereUniqueWithoutDonationsInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutDonationsInput, {
    nullable: false
  })
  data!: TaskUpdateWithoutDonationsInput;
}
