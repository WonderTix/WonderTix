import * as TypeGraphQL from 'type-graphql';
import {Customers} from '../../../models/Customers';
import {Donations} from '../../../models/Donations';
import {Task} from '../../../models/Task';
import {DonationsTaskArgs} from './args/DonationsTaskArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Donations)
export class DonationsRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Customers, {
    nullable: true,
  })
  async customers(@TypeGraphQL.Root() donations: Donations, @TypeGraphQL.Ctx() ctx: any): Promise<Customers | null> {
    return getPrismaFromContext(ctx).donations.findUnique({
      where: {
        id: donations.id,
      },
    }).customers({});
  }

  @TypeGraphQL.FieldResolver((_type) => [Task], {
    nullable: false,
  })
  async task(@TypeGraphQL.Root() donations: Donations, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DonationsTaskArgs): Promise<Task[]> {
    return getPrismaFromContext(ctx).donations.findUnique({
      where: {
        id: donations.id,
      },
    }).task(args);
  }
}
