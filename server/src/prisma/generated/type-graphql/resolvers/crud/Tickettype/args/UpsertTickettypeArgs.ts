import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TickettypeCreateInput} from '../../../inputs/TickettypeCreateInput';
import {TickettypeUpdateInput} from '../../../inputs/TickettypeUpdateInput';
import {TickettypeWhereUniqueInput} from '../../../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertTickettypeArgs {
  @TypeGraphQL.Field((_type) => TickettypeWhereUniqueInput, {
    nullable: false,
  })
    where!: TickettypeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TickettypeCreateInput, {
    nullable: false,
  })
    create!: TickettypeCreateInput;

  @TypeGraphQL.Field((_type) => TickettypeUpdateInput, {
    nullable: false,
  })
    update!: TickettypeUpdateInput;
}
