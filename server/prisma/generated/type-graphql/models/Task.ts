import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Customers } from "../models/Customers";
import { Donations } from "../models/Donations";
import { Reservation } from "../models/Reservation";
import { Task_notes } from "../models/Task_notes";
import { Users } from "../models/Users";
import { state } from "../enums/state";
import { TaskCount } from "../resolvers/outputs/TaskCount";

@TypeGraphQL.ObjectType("Task", {
  isAbstract: true
})
export class Task {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  parent_id?: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  subject?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  description?: string | null;

  @TypeGraphQL.Field(_type => state, {
    nullable: true
  })
  status?: "not_started" | "in_progress" | "completed" | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  assign_to?: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  report_to?: number | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  date_created?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  date_assigned?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  due_date?: Date | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  rel_contact?: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  rel_donation?: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  rel_ticket_order?: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  rel_account?: number | null;

  users_task_assign_toTousers?: Users | null;

  task?: Task | null;

  customers?: Customers | null;

  donations?: Donations | null;

  reservation?: Reservation | null;

  users_task_report_toTousers?: Users | null;

  other_task?: Task[];

  task_notes?: Task_notes[];

  @TypeGraphQL.Field(_type => TaskCount, {
    nullable: true
  })
  _count?: TaskCount | null;
}
