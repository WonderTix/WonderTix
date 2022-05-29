import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TickettypeUpdateInput } from "../../../inputs/TickettypeUpdateInput";
import { TickettypeWhereUniqueInput } from "../../../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateTickettypeArgs {
  @TypeGraphQL.Field(_type => TickettypeUpdateInput, {
    nullable: false
  })
  data!: TickettypeUpdateInput;

  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: false
  })
  where!: TickettypeWhereUniqueInput;
}
