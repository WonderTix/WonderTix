import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../scalars';
import {Customers} from '../models/Customers';
import {Task} from '../models/Task';
import {freq} from '../enums/freq';
import {DonationsCount} from '../resolvers/outputs/DonationsCount';

@TypeGraphQL.ObjectType('Donations', {
  isAbstract: true,
})
export class Donations {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    donorid?: number | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    isanonymous?: boolean | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
    amount?: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    dononame?: string | null;

  @TypeGraphQL.Field((_type) => freq, {
    nullable: true,
  })
    frequency?: 'one_time' | 'weekly' | 'monthly' | 'yearly' | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    comments?: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    donodate?: Date | null;

  customers?: Customers | null;

  task?: Task[];

  @TypeGraphQL.Field((_type) => DonationsCount, {
    nullable: true,
  })
    _count?: DonationsCount | null;
}
