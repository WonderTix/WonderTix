import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeScalarWhereInput} from '../inputs/TickettypeScalarWhereInput';
import {TickettypeUpdateManyMutationInput} from '../inputs/TickettypeUpdateManyMutationInput';

@TypeGraphQL.InputType('TickettypeUpdateManyWithWhereWithoutSeasonsInput', {
  isAbstract: true,
})
export class TickettypeUpdateManyWithWhereWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => TickettypeScalarWhereInput, {
    nullable: false,
  })
    where!: TickettypeScalarWhereInput;

  @TypeGraphQL.Field((_type) => TickettypeUpdateManyMutationInput, {
    nullable: false,
  })
    data!: TickettypeUpdateManyMutationInput;
}
