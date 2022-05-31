import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TicketsCreateManyInput } from "../../../inputs/TicketsCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyTicketsArgs {
  @TypeGraphQL.Field(_type => [TicketsCreateManyInput], {
    nullable: false
  })
  data!: TicketsCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
