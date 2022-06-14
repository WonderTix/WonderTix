import * as TypeGraphQL from 'type-graphql';

export enum TaskScalarFieldEnum {
  id = 'id',
  parent_id = 'parent_id',
  subject = 'subject',
  description = 'description',
  status = 'status',
  assign_to = 'assign_to',
  report_to = 'report_to',
  date_created = 'date_created',
  date_assigned = 'date_assigned',
  due_date = 'due_date',
  rel_contact = 'rel_contact',
  rel_donation = 'rel_donation',
  rel_ticket_order = 'rel_ticket_order',
  rel_account = 'rel_account'
}
TypeGraphQL.registerEnumType(TaskScalarFieldEnum, {
  name: 'TaskScalarFieldEnum',
  description: undefined,
});
