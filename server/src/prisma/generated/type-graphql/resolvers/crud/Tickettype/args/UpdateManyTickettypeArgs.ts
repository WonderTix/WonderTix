import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TickettypeUpdateManyMutationInput} from '../../../inputs/TickettypeUpdateManyMutationInput';
import {TickettypeWhereInput} from '../../../inputs/TickettypeWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyTickettypeArgs {
  @TypeGraphQL.Field((_type) => TickettypeUpdateManyMutationInput, {
    nullable: false,
  })
    data!: TickettypeUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => TickettypeWhereInput, {
    nullable: true,
  })
    where?: TickettypeWhereInput | undefined;
}
