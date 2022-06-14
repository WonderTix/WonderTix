import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../scalars';
import {Donations} from '../models/Donations';
import {Reservation} from '../models/Reservation';
import {Task} from '../models/Task';
import {Tickets} from '../models/Tickets';
import {CustomersCount} from '../resolvers/outputs/CustomersCount';

@TypeGraphQL.ObjectType('Customers', {
  isAbstract: true,
})
export class Customers {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
    custname!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    email?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    phone?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    custaddress?: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    newsletter?: boolean | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    donorbadge?: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    seatingaccom?: boolean | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    vip?: boolean | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
    volunteer_list!: boolean;

  donations?: Donations[];

  reservation?: Reservation[];

  task?: Task[];

  tickets?: Tickets[];

  @TypeGraphQL.Field((_type) => CustomersCount, {
    nullable: true,
  })
    _count?: CustomersCount | null;
}
