import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationUpdateInput } from "../../../inputs/ReservationUpdateInput";
import { ReservationWhereUniqueInput } from "../../../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateReservationArgs {
  @TypeGraphQL.Field(_type => ReservationUpdateInput, {
    nullable: false
  })
  data!: ReservationUpdateInput;

  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: false
  })
  where!: ReservationWhereUniqueInput;
}
