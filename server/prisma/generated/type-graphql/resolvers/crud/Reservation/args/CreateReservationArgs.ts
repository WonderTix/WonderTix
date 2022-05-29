import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationCreateInput } from "../../../inputs/ReservationCreateInput";

@TypeGraphQL.ArgsType()
export class CreateReservationArgs {
  @TypeGraphQL.Field(_type => ReservationCreateInput, {
    nullable: false
  })
  data!: ReservationCreateInput;
}
