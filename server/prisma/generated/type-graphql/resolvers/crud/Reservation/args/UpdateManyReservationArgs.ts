import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationUpdateManyMutationInput } from "../../../inputs/ReservationUpdateManyMutationInput";
import { ReservationWhereInput } from "../../../inputs/ReservationWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyReservationArgs {
  @TypeGraphQL.Field(_type => ReservationUpdateManyMutationInput, {
    nullable: false
  })
  data!: ReservationUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  where?: ReservationWhereInput | undefined;
}
