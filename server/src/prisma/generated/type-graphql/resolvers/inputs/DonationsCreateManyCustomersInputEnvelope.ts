import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateManyCustomersInput} from '../inputs/DonationsCreateManyCustomersInput';

@TypeGraphQL.InputType('DonationsCreateManyCustomersInputEnvelope', {
  isAbstract: true,
})
export class DonationsCreateManyCustomersInputEnvelope {
  @TypeGraphQL.Field((_type) => [DonationsCreateManyCustomersInput], {
    nullable: false,
  })
    data!: DonationsCreateManyCustomersInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
