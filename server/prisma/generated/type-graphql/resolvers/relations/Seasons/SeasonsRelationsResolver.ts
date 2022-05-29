import * as TypeGraphQL from "type-graphql";
import { Events } from "../../../models/Events";
import { Seasons } from "../../../models/Seasons";
import { Tickettype } from "../../../models/Tickettype";
import { SeasonsEventsArgs } from "./args/SeasonsEventsArgs";
import { SeasonsTickettypeArgs } from "./args/SeasonsTickettypeArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Seasons)
export class SeasonsRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Events], {
    nullable: false
  })
  async events(@TypeGraphQL.Root() seasons: Seasons, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: SeasonsEventsArgs): Promise<Events[]> {
    return getPrismaFromContext(ctx).seasons.findUnique({
      where: {
        id: seasons.id,
      },
    }).events(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Tickettype], {
    nullable: false
  })
  async tickettype(@TypeGraphQL.Root() seasons: Seasons, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: SeasonsTickettypeArgs): Promise<Tickettype[]> {
    return getPrismaFromContext(ctx).seasons.findUnique({
      where: {
        id: seasons.id,
      },
    }).tickettype(args);
  }
}
