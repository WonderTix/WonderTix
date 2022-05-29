import * as TypeGraphQL from "type-graphql";
import { Customers } from "../../../models/Customers";
import { Donations } from "../../../models/Donations";
import { Reservation } from "../../../models/Reservation";
import { Task } from "../../../models/Task";
import { Tickets } from "../../../models/Tickets";
import { CustomersDonationsArgs } from "./args/CustomersDonationsArgs";
import { CustomersReservationArgs } from "./args/CustomersReservationArgs";
import { CustomersTaskArgs } from "./args/CustomersTaskArgs";
import { CustomersTicketsArgs } from "./args/CustomersTicketsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Customers)
export class CustomersRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Donations], {
    nullable: false
  })
  async donations(@TypeGraphQL.Root() customers: Customers, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CustomersDonationsArgs): Promise<Donations[]> {
    return getPrismaFromContext(ctx).customers.findUnique({
      where: {
        id: customers.id,
      },
    }).donations(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Reservation], {
    nullable: false
  })
  async reservation(@TypeGraphQL.Root() customers: Customers, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CustomersReservationArgs): Promise<Reservation[]> {
    return getPrismaFromContext(ctx).customers.findUnique({
      where: {
        id: customers.id,
      },
    }).reservation(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Task], {
    nullable: false
  })
  async task(@TypeGraphQL.Root() customers: Customers, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CustomersTaskArgs): Promise<Task[]> {
    return getPrismaFromContext(ctx).customers.findUnique({
      where: {
        id: customers.id,
      },
    }).task(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Tickets], {
    nullable: false
  })
  async tickets(@TypeGraphQL.Root() customers: Customers, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CustomersTicketsArgs): Promise<Tickets[]> {
    return getPrismaFromContext(ctx).customers.findUnique({
      where: {
        id: customers.id,
      },
    }).tickets(args);
  }
}
