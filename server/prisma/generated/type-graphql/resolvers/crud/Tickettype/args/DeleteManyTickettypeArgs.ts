import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TickettypeWhereInput } from "../../../inputs/TickettypeWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyTickettypeArgs {
  @TypeGraphQL.Field(_type => TickettypeWhereInput, {
    nullable: true
  })
  where?: TickettypeWhereInput | undefined;
}
