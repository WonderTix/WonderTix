import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskUpdateWithoutReservationInput } from "../inputs/TaskUpdateWithoutReservationInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateWithWhereUniqueWithoutReservationInput", {
  isAbstract: true
})
export class TaskUpdateWithWhereUniqueWithoutReservationInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutReservationInput, {
    nullable: false
  })
  data!: TaskUpdateWithoutReservationInput;
}
