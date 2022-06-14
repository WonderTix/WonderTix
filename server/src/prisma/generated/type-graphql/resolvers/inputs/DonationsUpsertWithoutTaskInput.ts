import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateWithoutTaskInput} from '../inputs/DonationsCreateWithoutTaskInput';
import {DonationsUpdateWithoutTaskInput} from '../inputs/DonationsUpdateWithoutTaskInput';

@TypeGraphQL.InputType('DonationsUpsertWithoutTaskInput', {
  isAbstract: true,
})
export class DonationsUpsertWithoutTaskInput {
  @TypeGraphQL.Field((_type) => DonationsUpdateWithoutTaskInput, {
    nullable: false,
  })
    update!: DonationsUpdateWithoutTaskInput;

  @TypeGraphQL.Field((_type) => DonationsCreateWithoutTaskInput, {
    nullable: false,
  })
    create!: DonationsCreateWithoutTaskInput;
}
