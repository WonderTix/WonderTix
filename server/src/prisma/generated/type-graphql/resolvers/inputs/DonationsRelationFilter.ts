import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsWhereInput} from '../inputs/DonationsWhereInput';

@TypeGraphQL.InputType('DonationsRelationFilter', {
  isAbstract: true,
})
export class DonationsRelationFilter {
  @TypeGraphQL.Field((_type) => DonationsWhereInput, {
    nullable: true,
  })
    is?: DonationsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsWhereInput, {
    nullable: true,
  })
    isNot?: DonationsWhereInput | undefined;
}
