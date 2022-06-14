import * as TypeGraphQL from 'type-graphql';

export enum Task_notesScalarFieldEnum {
  id = 'id',
  task_id = 'task_id',
  notes = 'notes',
  date_created = 'date_created'
}
TypeGraphQL.registerEnumType(Task_notesScalarFieldEnum, {
  name: 'Task_notesScalarFieldEnum',
  description: undefined,
});
