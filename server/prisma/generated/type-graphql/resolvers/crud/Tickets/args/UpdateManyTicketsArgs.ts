import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TicketsUpdateManyMutationInput } from "../../../inputs/TicketsUpdateManyMutationInput";
import { TicketsWhereInput } from "../../../inputs/TicketsWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyTicketsArgs {
  @TypeGraphQL.Field(_type => TicketsUpdateManyMutationInput, {
    nullable: false
  })
  data!: TicketsUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => TicketsWhereInput, {
    nullable: true
  })
  where?: TicketsWhereInput | undefined;
}
