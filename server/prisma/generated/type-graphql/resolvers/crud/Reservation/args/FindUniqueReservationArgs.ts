import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationWhereUniqueInput } from "../../../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueReservationArgs {
  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: false
  })
  where!: ReservationWhereUniqueInput;
}
