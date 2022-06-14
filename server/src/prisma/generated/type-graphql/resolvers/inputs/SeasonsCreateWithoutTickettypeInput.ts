import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsCreateNestedManyWithoutSeasonsInput} from '../inputs/EventsCreateNestedManyWithoutSeasonsInput';

@TypeGraphQL.InputType('SeasonsCreateWithoutTickettypeInput', {
  isAbstract: true,
})
export class SeasonsCreateWithoutTickettypeInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    name?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    startdate?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    enddate?: Date | undefined;

  @TypeGraphQL.Field((_type) => EventsCreateNestedManyWithoutSeasonsInput, {
    nullable: true,
  })
    events?: EventsCreateNestedManyWithoutSeasonsInput | undefined;
}
