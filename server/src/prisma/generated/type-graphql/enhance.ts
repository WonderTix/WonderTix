import {ClassType} from 'type-graphql';
import * as tslib from 'tslib';
import * as crudResolvers from './resolvers/crud/resolvers-crud.index';
import * as argsTypes from './resolvers/crud/args.index';
import * as actionResolvers from './resolvers/crud/resolvers-actions.index';
import * as relationResolvers from './resolvers/relations/resolvers.index';
import * as models from './models';
import * as outputTypes from './resolvers/outputs';
import * as inputTypes from './resolvers/inputs';

const crudResolversMap = {
  Customers: crudResolvers.CustomersCrudResolver,
  Discounts: crudResolvers.DiscountsCrudResolver,
  Donations: crudResolvers.DonationsCrudResolver,
  Event_instances: crudResolvers.Event_instancesCrudResolver,
  Events: crudResolvers.EventsCrudResolver,
  Linkedtickets: crudResolvers.LinkedticketsCrudResolver,
  Reservation: crudResolvers.ReservationCrudResolver,
  Saved_reports: crudResolvers.Saved_reportsCrudResolver,
  Seasons: crudResolvers.SeasonsCrudResolver,
  Task: crudResolvers.TaskCrudResolver,
  Task_notes: crudResolvers.Task_notesCrudResolver,
  Tickets: crudResolvers.TicketsCrudResolver,
  Tickettype: crudResolvers.TickettypeCrudResolver,
  Users: crudResolvers.UsersCrudResolver,
};
const actionResolversMap = {
  Customers: {
    findUniqueCustomers: actionResolvers.FindUniqueCustomersResolver,
    findFirstCustomers: actionResolvers.FindFirstCustomersResolver,
    findManyCustomers: actionResolvers.FindManyCustomersResolver,
    createCustomers: actionResolvers.CreateCustomersResolver,
    createManyCustomers: actionResolvers.CreateManyCustomersResolver,
    deleteCustomers: actionResolvers.DeleteCustomersResolver,
    updateCustomers: actionResolvers.UpdateCustomersResolver,
    deleteManyCustomers: actionResolvers.DeleteManyCustomersResolver,
    updateManyCustomers: actionResolvers.UpdateManyCustomersResolver,
    upsertCustomers: actionResolvers.UpsertCustomersResolver,
    aggregateCustomers: actionResolvers.AggregateCustomersResolver,
    groupByCustomers: actionResolvers.GroupByCustomersResolver,
  },
  Discounts: {
    findUniqueDiscounts: actionResolvers.FindUniqueDiscountsResolver,
    findFirstDiscounts: actionResolvers.FindFirstDiscountsResolver,
    findManyDiscounts: actionResolvers.FindManyDiscountsResolver,
    createDiscounts: actionResolvers.CreateDiscountsResolver,
    createManyDiscounts: actionResolvers.CreateManyDiscountsResolver,
    deleteDiscounts: actionResolvers.DeleteDiscountsResolver,
    updateDiscounts: actionResolvers.UpdateDiscountsResolver,
    deleteManyDiscounts: actionResolvers.DeleteManyDiscountsResolver,
    updateManyDiscounts: actionResolvers.UpdateManyDiscountsResolver,
    upsertDiscounts: actionResolvers.UpsertDiscountsResolver,
    aggregateDiscounts: actionResolvers.AggregateDiscountsResolver,
    groupByDiscounts: actionResolvers.GroupByDiscountsResolver,
  },
  Donations: {
    findUniqueDonations: actionResolvers.FindUniqueDonationsResolver,
    findFirstDonations: actionResolvers.FindFirstDonationsResolver,
    findManyDonations: actionResolvers.FindManyDonationsResolver,
    createDonations: actionResolvers.CreateDonationsResolver,
    createManyDonations: actionResolvers.CreateManyDonationsResolver,
    deleteDonations: actionResolvers.DeleteDonationsResolver,
    updateDonations: actionResolvers.UpdateDonationsResolver,
    deleteManyDonations: actionResolvers.DeleteManyDonationsResolver,
    updateManyDonations: actionResolvers.UpdateManyDonationsResolver,
    upsertDonations: actionResolvers.UpsertDonationsResolver,
    aggregateDonations: actionResolvers.AggregateDonationsResolver,
    groupByDonations: actionResolvers.GroupByDonationsResolver,
  },
  Event_instances: {
    findUniqueEvent_instances: actionResolvers.FindUniqueEvent_instancesResolver,
    findFirstEvent_instances: actionResolvers.FindFirstEvent_instancesResolver,
    findManyEvent_instances: actionResolvers.FindManyEvent_instancesResolver,
    createEvent_instances: actionResolvers.CreateEvent_instancesResolver,
    createManyEvent_instances: actionResolvers.CreateManyEvent_instancesResolver,
    deleteEvent_instances: actionResolvers.DeleteEvent_instancesResolver,
    updateEvent_instances: actionResolvers.UpdateEvent_instancesResolver,
    deleteManyEvent_instances: actionResolvers.DeleteManyEvent_instancesResolver,
    updateManyEvent_instances: actionResolvers.UpdateManyEvent_instancesResolver,
    upsertEvent_instances: actionResolvers.UpsertEvent_instancesResolver,
    aggregateEvent_instances: actionResolvers.AggregateEvent_instancesResolver,
    groupByEvent_instances: actionResolvers.GroupByEvent_instancesResolver,
  },
  Events: {
    findUniqueEvents: actionResolvers.FindUniqueEventsResolver,
    findFirstEvents: actionResolvers.FindFirstEventsResolver,
    findManyEvents: actionResolvers.FindManyEventsResolver,
    createEvents: actionResolvers.CreateEventsResolver,
    createManyEvents: actionResolvers.CreateManyEventsResolver,
    deleteEvents: actionResolvers.DeleteEventsResolver,
    updateEvents: actionResolvers.UpdateEventsResolver,
    deleteManyEvents: actionResolvers.DeleteManyEventsResolver,
    updateManyEvents: actionResolvers.UpdateManyEventsResolver,
    upsertEvents: actionResolvers.UpsertEventsResolver,
    aggregateEvents: actionResolvers.AggregateEventsResolver,
    groupByEvents: actionResolvers.GroupByEventsResolver,
  },
  Linkedtickets: {
    findUniqueLinkedtickets: actionResolvers.FindUniqueLinkedticketsResolver,
    findFirstLinkedtickets: actionResolvers.FindFirstLinkedticketsResolver,
    findManyLinkedtickets: actionResolvers.FindManyLinkedticketsResolver,
    createLinkedtickets: actionResolvers.CreateLinkedticketsResolver,
    createManyLinkedtickets: actionResolvers.CreateManyLinkedticketsResolver,
    deleteLinkedtickets: actionResolvers.DeleteLinkedticketsResolver,
    updateLinkedtickets: actionResolvers.UpdateLinkedticketsResolver,
    deleteManyLinkedtickets: actionResolvers.DeleteManyLinkedticketsResolver,
    updateManyLinkedtickets: actionResolvers.UpdateManyLinkedticketsResolver,
    upsertLinkedtickets: actionResolvers.UpsertLinkedticketsResolver,
    aggregateLinkedtickets: actionResolvers.AggregateLinkedticketsResolver,
    groupByLinkedtickets: actionResolvers.GroupByLinkedticketsResolver,
  },
  Reservation: {
    reservation: actionResolvers.FindUniqueReservationResolver,
    findFirstReservation: actionResolvers.FindFirstReservationResolver,
    reservations: actionResolvers.FindManyReservationResolver,
    createReservation: actionResolvers.CreateReservationResolver,
    createManyReservation: actionResolvers.CreateManyReservationResolver,
    deleteReservation: actionResolvers.DeleteReservationResolver,
    updateReservation: actionResolvers.UpdateReservationResolver,
    deleteManyReservation: actionResolvers.DeleteManyReservationResolver,
    updateManyReservation: actionResolvers.UpdateManyReservationResolver,
    upsertReservation: actionResolvers.UpsertReservationResolver,
    aggregateReservation: actionResolvers.AggregateReservationResolver,
    groupByReservation: actionResolvers.GroupByReservationResolver,
  },
  Saved_reports: {
    findUniqueSaved_reports: actionResolvers.FindUniqueSaved_reportsResolver,
    findFirstSaved_reports: actionResolvers.FindFirstSaved_reportsResolver,
    findManySaved_reports: actionResolvers.FindManySaved_reportsResolver,
    createSaved_reports: actionResolvers.CreateSaved_reportsResolver,
    createManySaved_reports: actionResolvers.CreateManySaved_reportsResolver,
    deleteSaved_reports: actionResolvers.DeleteSaved_reportsResolver,
    updateSaved_reports: actionResolvers.UpdateSaved_reportsResolver,
    deleteManySaved_reports: actionResolvers.DeleteManySaved_reportsResolver,
    updateManySaved_reports: actionResolvers.UpdateManySaved_reportsResolver,
    upsertSaved_reports: actionResolvers.UpsertSaved_reportsResolver,
    aggregateSaved_reports: actionResolvers.AggregateSaved_reportsResolver,
    groupBySaved_reports: actionResolvers.GroupBySaved_reportsResolver,
  },
  Seasons: {
    findUniqueSeasons: actionResolvers.FindUniqueSeasonsResolver,
    findFirstSeasons: actionResolvers.FindFirstSeasonsResolver,
    findManySeasons: actionResolvers.FindManySeasonsResolver,
    createSeasons: actionResolvers.CreateSeasonsResolver,
    createManySeasons: actionResolvers.CreateManySeasonsResolver,
    deleteSeasons: actionResolvers.DeleteSeasonsResolver,
    updateSeasons: actionResolvers.UpdateSeasonsResolver,
    deleteManySeasons: actionResolvers.DeleteManySeasonsResolver,
    updateManySeasons: actionResolvers.UpdateManySeasonsResolver,
    upsertSeasons: actionResolvers.UpsertSeasonsResolver,
    aggregateSeasons: actionResolvers.AggregateSeasonsResolver,
    groupBySeasons: actionResolvers.GroupBySeasonsResolver,
  },
  Task: {
    task: actionResolvers.FindUniqueTaskResolver,
    findFirstTask: actionResolvers.FindFirstTaskResolver,
    tasks: actionResolvers.FindManyTaskResolver,
    createTask: actionResolvers.CreateTaskResolver,
    createManyTask: actionResolvers.CreateManyTaskResolver,
    deleteTask: actionResolvers.DeleteTaskResolver,
    updateTask: actionResolvers.UpdateTaskResolver,
    deleteManyTask: actionResolvers.DeleteManyTaskResolver,
    updateManyTask: actionResolvers.UpdateManyTaskResolver,
    upsertTask: actionResolvers.UpsertTaskResolver,
    aggregateTask: actionResolvers.AggregateTaskResolver,
    groupByTask: actionResolvers.GroupByTaskResolver,
  },
  Task_notes: {
    findUniqueTask_notes: actionResolvers.FindUniqueTask_notesResolver,
    findFirstTask_notes: actionResolvers.FindFirstTask_notesResolver,
    findManyTask_notes: actionResolvers.FindManyTask_notesResolver,
    createTask_notes: actionResolvers.CreateTask_notesResolver,
    createManyTask_notes: actionResolvers.CreateManyTask_notesResolver,
    deleteTask_notes: actionResolvers.DeleteTask_notesResolver,
    updateTask_notes: actionResolvers.UpdateTask_notesResolver,
    deleteManyTask_notes: actionResolvers.DeleteManyTask_notesResolver,
    updateManyTask_notes: actionResolvers.UpdateManyTask_notesResolver,
    upsertTask_notes: actionResolvers.UpsertTask_notesResolver,
    aggregateTask_notes: actionResolvers.AggregateTask_notesResolver,
    groupByTask_notes: actionResolvers.GroupByTask_notesResolver,
  },
  Tickets: {
    findUniqueTickets: actionResolvers.FindUniqueTicketsResolver,
    findFirstTickets: actionResolvers.FindFirstTicketsResolver,
    findManyTickets: actionResolvers.FindManyTicketsResolver,
    createTickets: actionResolvers.CreateTicketsResolver,
    createManyTickets: actionResolvers.CreateManyTicketsResolver,
    deleteTickets: actionResolvers.DeleteTicketsResolver,
    updateTickets: actionResolvers.UpdateTicketsResolver,
    deleteManyTickets: actionResolvers.DeleteManyTicketsResolver,
    updateManyTickets: actionResolvers.UpdateManyTicketsResolver,
    upsertTickets: actionResolvers.UpsertTicketsResolver,
    aggregateTickets: actionResolvers.AggregateTicketsResolver,
    groupByTickets: actionResolvers.GroupByTicketsResolver,
  },
  Tickettype: {
    tickettype: actionResolvers.FindUniqueTickettypeResolver,
    findFirstTickettype: actionResolvers.FindFirstTickettypeResolver,
    tickettypes: actionResolvers.FindManyTickettypeResolver,
    createTickettype: actionResolvers.CreateTickettypeResolver,
    createManyTickettype: actionResolvers.CreateManyTickettypeResolver,
    deleteTickettype: actionResolvers.DeleteTickettypeResolver,
    updateTickettype: actionResolvers.UpdateTickettypeResolver,
    deleteManyTickettype: actionResolvers.DeleteManyTickettypeResolver,
    updateManyTickettype: actionResolvers.UpdateManyTickettypeResolver,
    upsertTickettype: actionResolvers.UpsertTickettypeResolver,
    aggregateTickettype: actionResolvers.AggregateTickettypeResolver,
    groupByTickettype: actionResolvers.GroupByTickettypeResolver,
  },
  Users: {
    findUniqueUsers: actionResolvers.FindUniqueUsersResolver,
    findFirstUsers: actionResolvers.FindFirstUsersResolver,
    findManyUsers: actionResolvers.FindManyUsersResolver,
    createUsers: actionResolvers.CreateUsersResolver,
    createManyUsers: actionResolvers.CreateManyUsersResolver,
    deleteUsers: actionResolvers.DeleteUsersResolver,
    updateUsers: actionResolvers.UpdateUsersResolver,
    deleteManyUsers: actionResolvers.DeleteManyUsersResolver,
    updateManyUsers: actionResolvers.UpdateManyUsersResolver,
    upsertUsers: actionResolvers.UpsertUsersResolver,
    aggregateUsers: actionResolvers.AggregateUsersResolver,
    groupByUsers: actionResolvers.GroupByUsersResolver,
  },
};
const crudResolversInfo = {
  Customers: ['findUniqueCustomers', 'findFirstCustomers', 'findManyCustomers', 'createCustomers', 'createManyCustomers', 'deleteCustomers', 'updateCustomers', 'deleteManyCustomers', 'updateManyCustomers', 'upsertCustomers', 'aggregateCustomers', 'groupByCustomers'],
  Discounts: ['findUniqueDiscounts', 'findFirstDiscounts', 'findManyDiscounts', 'createDiscounts', 'createManyDiscounts', 'deleteDiscounts', 'updateDiscounts', 'deleteManyDiscounts', 'updateManyDiscounts', 'upsertDiscounts', 'aggregateDiscounts', 'groupByDiscounts'],
  Donations: ['findUniqueDonations', 'findFirstDonations', 'findManyDonations', 'createDonations', 'createManyDonations', 'deleteDonations', 'updateDonations', 'deleteManyDonations', 'updateManyDonations', 'upsertDonations', 'aggregateDonations', 'groupByDonations'],
  Event_instances: ['findUniqueEvent_instances', 'findFirstEvent_instances', 'findManyEvent_instances', 'createEvent_instances', 'createManyEvent_instances', 'deleteEvent_instances', 'updateEvent_instances', 'deleteManyEvent_instances', 'updateManyEvent_instances', 'upsertEvent_instances', 'aggregateEvent_instances', 'groupByEvent_instances'],
  Events: ['findUniqueEvents', 'findFirstEvents', 'findManyEvents', 'createEvents', 'createManyEvents', 'deleteEvents', 'updateEvents', 'deleteManyEvents', 'updateManyEvents', 'upsertEvents', 'aggregateEvents', 'groupByEvents'],
  Linkedtickets: ['findUniqueLinkedtickets', 'findFirstLinkedtickets', 'findManyLinkedtickets', 'createLinkedtickets', 'createManyLinkedtickets', 'deleteLinkedtickets', 'updateLinkedtickets', 'deleteManyLinkedtickets', 'updateManyLinkedtickets', 'upsertLinkedtickets', 'aggregateLinkedtickets', 'groupByLinkedtickets'],
  Reservation: ['reservation', 'findFirstReservation', 'reservations', 'createReservation', 'createManyReservation', 'deleteReservation', 'updateReservation', 'deleteManyReservation', 'updateManyReservation', 'upsertReservation', 'aggregateReservation', 'groupByReservation'],
  Saved_reports: ['findUniqueSaved_reports', 'findFirstSaved_reports', 'findManySaved_reports', 'createSaved_reports', 'createManySaved_reports', 'deleteSaved_reports', 'updateSaved_reports', 'deleteManySaved_reports', 'updateManySaved_reports', 'upsertSaved_reports', 'aggregateSaved_reports', 'groupBySaved_reports'],
  Seasons: ['findUniqueSeasons', 'findFirstSeasons', 'findManySeasons', 'createSeasons', 'createManySeasons', 'deleteSeasons', 'updateSeasons', 'deleteManySeasons', 'updateManySeasons', 'upsertSeasons', 'aggregateSeasons', 'groupBySeasons'],
  Task: ['task', 'findFirstTask', 'tasks', 'createTask', 'createManyTask', 'deleteTask', 'updateTask', 'deleteManyTask', 'updateManyTask', 'upsertTask', 'aggregateTask', 'groupByTask'],
  Task_notes: ['findUniqueTask_notes', 'findFirstTask_notes', 'findManyTask_notes', 'createTask_notes', 'createManyTask_notes', 'deleteTask_notes', 'updateTask_notes', 'deleteManyTask_notes', 'updateManyTask_notes', 'upsertTask_notes', 'aggregateTask_notes', 'groupByTask_notes'],
  Tickets: ['findUniqueTickets', 'findFirstTickets', 'findManyTickets', 'createTickets', 'createManyTickets', 'deleteTickets', 'updateTickets', 'deleteManyTickets', 'updateManyTickets', 'upsertTickets', 'aggregateTickets', 'groupByTickets'],
  Tickettype: ['tickettype', 'findFirstTickettype', 'tickettypes', 'createTickettype', 'createManyTickettype', 'deleteTickettype', 'updateTickettype', 'deleteManyTickettype', 'updateManyTickettype', 'upsertTickettype', 'aggregateTickettype', 'groupByTickettype'],
  Users: ['findUniqueUsers', 'findFirstUsers', 'findManyUsers', 'createUsers', 'createManyUsers', 'deleteUsers', 'updateUsers', 'deleteManyUsers', 'updateManyUsers', 'upsertUsers', 'aggregateUsers', 'groupByUsers'],
};
const argsInfo = {
  FindUniqueCustomersArgs: ['where'],
  FindFirstCustomersArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyCustomersArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateCustomersArgs: ['data'],
  CreateManyCustomersArgs: ['data', 'skipDuplicates'],
  DeleteCustomersArgs: ['where'],
  UpdateCustomersArgs: ['data', 'where'],
  DeleteManyCustomersArgs: ['where'],
  UpdateManyCustomersArgs: ['data', 'where'],
  UpsertCustomersArgs: ['where', 'create', 'update'],
  AggregateCustomersArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByCustomersArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueDiscountsArgs: ['where'],
  FindFirstDiscountsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyDiscountsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateDiscountsArgs: ['data'],
  CreateManyDiscountsArgs: ['data', 'skipDuplicates'],
  DeleteDiscountsArgs: ['where'],
  UpdateDiscountsArgs: ['data', 'where'],
  DeleteManyDiscountsArgs: ['where'],
  UpdateManyDiscountsArgs: ['data', 'where'],
  UpsertDiscountsArgs: ['where', 'create', 'update'],
  AggregateDiscountsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByDiscountsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueDonationsArgs: ['where'],
  FindFirstDonationsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyDonationsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateDonationsArgs: ['data'],
  CreateManyDonationsArgs: ['data', 'skipDuplicates'],
  DeleteDonationsArgs: ['where'],
  UpdateDonationsArgs: ['data', 'where'],
  DeleteManyDonationsArgs: ['where'],
  UpdateManyDonationsArgs: ['data', 'where'],
  UpsertDonationsArgs: ['where', 'create', 'update'],
  AggregateDonationsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByDonationsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueEvent_instancesArgs: ['where'],
  FindFirstEvent_instancesArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyEvent_instancesArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateEvent_instancesArgs: ['data'],
  CreateManyEvent_instancesArgs: ['data', 'skipDuplicates'],
  DeleteEvent_instancesArgs: ['where'],
  UpdateEvent_instancesArgs: ['data', 'where'],
  DeleteManyEvent_instancesArgs: ['where'],
  UpdateManyEvent_instancesArgs: ['data', 'where'],
  UpsertEvent_instancesArgs: ['where', 'create', 'update'],
  AggregateEvent_instancesArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByEvent_instancesArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueEventsArgs: ['where'],
  FindFirstEventsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyEventsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateEventsArgs: ['data'],
  CreateManyEventsArgs: ['data', 'skipDuplicates'],
  DeleteEventsArgs: ['where'],
  UpdateEventsArgs: ['data', 'where'],
  DeleteManyEventsArgs: ['where'],
  UpdateManyEventsArgs: ['data', 'where'],
  UpsertEventsArgs: ['where', 'create', 'update'],
  AggregateEventsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByEventsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueLinkedticketsArgs: ['where'],
  FindFirstLinkedticketsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyLinkedticketsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateLinkedticketsArgs: ['data'],
  CreateManyLinkedticketsArgs: ['data', 'skipDuplicates'],
  DeleteLinkedticketsArgs: ['where'],
  UpdateLinkedticketsArgs: ['data', 'where'],
  DeleteManyLinkedticketsArgs: ['where'],
  UpdateManyLinkedticketsArgs: ['data', 'where'],
  UpsertLinkedticketsArgs: ['where', 'create', 'update'],
  AggregateLinkedticketsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByLinkedticketsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueReservationArgs: ['where'],
  FindFirstReservationArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyReservationArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateReservationArgs: ['data'],
  CreateManyReservationArgs: ['data', 'skipDuplicates'],
  DeleteReservationArgs: ['where'],
  UpdateReservationArgs: ['data', 'where'],
  DeleteManyReservationArgs: ['where'],
  UpdateManyReservationArgs: ['data', 'where'],
  UpsertReservationArgs: ['where', 'create', 'update'],
  AggregateReservationArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByReservationArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueSaved_reportsArgs: ['where'],
  FindFirstSaved_reportsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManySaved_reportsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateSaved_reportsArgs: ['data'],
  CreateManySaved_reportsArgs: ['data', 'skipDuplicates'],
  DeleteSaved_reportsArgs: ['where'],
  UpdateSaved_reportsArgs: ['data', 'where'],
  DeleteManySaved_reportsArgs: ['where'],
  UpdateManySaved_reportsArgs: ['data', 'where'],
  UpsertSaved_reportsArgs: ['where', 'create', 'update'],
  AggregateSaved_reportsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupBySaved_reportsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueSeasonsArgs: ['where'],
  FindFirstSeasonsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManySeasonsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateSeasonsArgs: ['data'],
  CreateManySeasonsArgs: ['data', 'skipDuplicates'],
  DeleteSeasonsArgs: ['where'],
  UpdateSeasonsArgs: ['data', 'where'],
  DeleteManySeasonsArgs: ['where'],
  UpdateManySeasonsArgs: ['data', 'where'],
  UpsertSeasonsArgs: ['where', 'create', 'update'],
  AggregateSeasonsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupBySeasonsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueTaskArgs: ['where'],
  FindFirstTaskArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyTaskArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateTaskArgs: ['data'],
  CreateManyTaskArgs: ['data', 'skipDuplicates'],
  DeleteTaskArgs: ['where'],
  UpdateTaskArgs: ['data', 'where'],
  DeleteManyTaskArgs: ['where'],
  UpdateManyTaskArgs: ['data', 'where'],
  UpsertTaskArgs: ['where', 'create', 'update'],
  AggregateTaskArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByTaskArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueTask_notesArgs: ['where'],
  FindFirstTask_notesArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyTask_notesArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateTask_notesArgs: ['data'],
  CreateManyTask_notesArgs: ['data', 'skipDuplicates'],
  DeleteTask_notesArgs: ['where'],
  UpdateTask_notesArgs: ['data', 'where'],
  DeleteManyTask_notesArgs: ['where'],
  UpdateManyTask_notesArgs: ['data', 'where'],
  UpsertTask_notesArgs: ['where', 'create', 'update'],
  AggregateTask_notesArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByTask_notesArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueTicketsArgs: ['where'],
  FindFirstTicketsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyTicketsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateTicketsArgs: ['data'],
  CreateManyTicketsArgs: ['data', 'skipDuplicates'],
  DeleteTicketsArgs: ['where'],
  UpdateTicketsArgs: ['data', 'where'],
  DeleteManyTicketsArgs: ['where'],
  UpdateManyTicketsArgs: ['data', 'where'],
  UpsertTicketsArgs: ['where', 'create', 'update'],
  AggregateTicketsArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByTicketsArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueTickettypeArgs: ['where'],
  FindFirstTickettypeArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyTickettypeArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateTickettypeArgs: ['data'],
  CreateManyTickettypeArgs: ['data', 'skipDuplicates'],
  DeleteTickettypeArgs: ['where'],
  UpdateTickettypeArgs: ['data', 'where'],
  DeleteManyTickettypeArgs: ['where'],
  UpdateManyTickettypeArgs: ['data', 'where'],
  UpsertTickettypeArgs: ['where', 'create', 'update'],
  AggregateTickettypeArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByTickettypeArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
  FindUniqueUsersArgs: ['where'],
  FindFirstUsersArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  FindManyUsersArgs: ['where', 'orderBy', 'cursor', 'take', 'skip', 'distinct'],
  CreateUsersArgs: ['data'],
  CreateManyUsersArgs: ['data', 'skipDuplicates'],
  DeleteUsersArgs: ['where'],
  UpdateUsersArgs: ['data', 'where'],
  DeleteManyUsersArgs: ['where'],
  UpdateManyUsersArgs: ['data', 'where'],
  UpsertUsersArgs: ['where', 'create', 'update'],
  AggregateUsersArgs: ['where', 'orderBy', 'cursor', 'take', 'skip'],
  GroupByUsersArgs: ['where', 'orderBy', 'by', 'having', 'take', 'skip'],
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]['prototype'];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | '_all', MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
    resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
        (it) => it !== '_all',
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]['prototype'],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
    argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
        typeConfig,
        typeClass,
        typeTarget,
        argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  Customers: relationResolvers.CustomersRelationsResolver,
  Donations: relationResolvers.DonationsRelationsResolver,
  Event_instances: relationResolvers.Event_instancesRelationsResolver,
  Events: relationResolvers.EventsRelationsResolver,
  Linkedtickets: relationResolvers.LinkedticketsRelationsResolver,
  Reservation: relationResolvers.ReservationRelationsResolver,
  Seasons: relationResolvers.SeasonsRelationsResolver,
  Task: relationResolvers.TaskRelationsResolver,
  Task_notes: relationResolvers.Task_notesRelationsResolver,
  Tickets: relationResolvers.TicketsRelationsResolver,
  Tickettype: relationResolvers.TickettypeRelationsResolver,
  Users: relationResolvers.UsersRelationsResolver,
};
const relationResolversInfo = {
  Customers: ['donations', 'reservation', 'task', 'tickets'],
  Donations: ['customers', 'task'],
  Event_instances: ['events', 'linkedtickets', 'tickets'],
  Events: ['seasons', 'event_instances'],
  Linkedtickets: ['event_instances', 'tickettype'],
  Reservation: ['customers', 'task'],
  Seasons: ['events', 'tickettype'],
  Task: ['users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  Task_notes: ['task'],
  Tickets: ['customers', 'event_instances', 'tickettype'],
  Tickettype: ['seasons', 'linkedtickets', 'tickets'],
  Users: ['task_task_assign_toTousers', 'task_task_report_toTousers'],
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]['prototype'];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | '_all', MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
    relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
        (it) => it !== '_all',
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | '_all', PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
    enhanceConfig: TEnhanceConfig,
    typeClass: ClassType<TType>,
    typePrototype: TType,
    typeFieldNames: string[],
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
        (it) => it !== '_all',
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  Customers: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  Discounts: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  Donations: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  Event_instances: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Events: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  Linkedtickets: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  Reservation: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  Saved_reports: ['id', 'table_name', 'query_attr'],
  Seasons: ['id', 'name', 'startdate', 'enddate'],
  Task: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  Task_notes: ['id', 'task_id', 'notes', 'date_created'],
  Tickets: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  Tickettype: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  Users: ['id', 'username', 'pass_hash', 'is_superadmin'],
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]['prototype'],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
        modelConfig,
        modelClass,
        modelTarget,
        modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateCustomers: ['_count', '_avg', '_sum', '_min', '_max'],
  CustomersGroupBy: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateDiscounts: ['_count', '_avg', '_sum', '_min', '_max'],
  DiscountsGroupBy: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateDonations: ['_count', '_avg', '_sum', '_min', '_max'],
  DonationsGroupBy: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateEvent_instances: ['_count', '_avg', '_sum', '_min', '_max'],
  Event_instancesGroupBy: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateEvents: ['_count', '_avg', '_sum', '_min', '_max'],
  EventsGroupBy: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateLinkedtickets: ['_count', '_avg', '_sum', '_min', '_max'],
  LinkedticketsGroupBy: ['id', 'event_instance_id', 'ticket_type', 'dummy', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateReservation: ['_count', '_avg', '_sum', '_min', '_max'],
  ReservationGroupBy: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateSaved_reports: ['_count', '_avg', '_sum', '_min', '_max'],
  Saved_reportsGroupBy: ['id', 'table_name', 'query_attr', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateSeasons: ['_count', '_avg', '_sum', '_min', '_max'],
  SeasonsGroupBy: ['id', 'name', 'startdate', 'enddate', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateTask: ['_count', '_avg', '_sum', '_min', '_max'],
  TaskGroupBy: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateTask_notes: ['_count', '_avg', '_sum', '_min', '_max'],
  Task_notesGroupBy: ['id', 'task_id', 'notes', 'date_created', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateTickets: ['_count', '_avg', '_sum', '_min', '_max'],
  TicketsGroupBy: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateTickettype: ['_count', '_avg', '_sum', '_min', '_max'],
  TickettypeGroupBy: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions', '_count', '_avg', '_sum', '_min', '_max'],
  AggregateUsers: ['_count', '_avg', '_sum', '_min', '_max'],
  UsersGroupBy: ['id', 'username', 'pass_hash', 'is_superadmin', '_count', '_avg', '_sum', '_min', '_max'],
  AffectedRowsOutput: ['count'],
  CustomersCount: ['donations', 'reservation', 'task', 'tickets'],
  CustomersCountAggregate: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', '_all'],
  CustomersAvgAggregate: ['id'],
  CustomersSumAggregate: ['id'],
  CustomersMinAggregate: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  CustomersMaxAggregate: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  DiscountsCountAggregate: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events', '_all'],
  DiscountsAvgAggregate: ['id', 'amount', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsSumAggregate: ['id', 'amount', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsMinAggregate: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsMaxAggregate: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DonationsCount: ['task'],
  DonationsCountAggregate: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', '_all'],
  DonationsAvgAggregate: ['id', 'donorid', 'amount'],
  DonationsSumAggregate: ['id', 'donorid', 'amount'],
  DonationsMinAggregate: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  DonationsMaxAggregate: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  Event_instancesCount: ['linkedtickets', 'tickets'],
  Event_instancesCountAggregate: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', '_all'],
  Event_instancesAvgAggregate: ['id', 'eventid', 'totalseats', 'availableseats'],
  Event_instancesSumAggregate: ['id', 'eventid', 'totalseats', 'availableseats'],
  Event_instancesMinAggregate: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesMaxAggregate: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  EventsCount: ['event_instances'],
  EventsCountAggregate: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url', '_all'],
  EventsAvgAggregate: ['id', 'seasonid'],
  EventsSumAggregate: ['id', 'seasonid'],
  EventsMinAggregate: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  EventsMaxAggregate: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  LinkedticketsCountAggregate: ['id', 'event_instance_id', 'ticket_type', 'dummy', '_all'],
  LinkedticketsAvgAggregate: ['id', 'event_instance_id', 'ticket_type'],
  LinkedticketsSumAggregate: ['id', 'event_instance_id', 'ticket_type'],
  LinkedticketsMinAggregate: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  LinkedticketsMaxAggregate: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  ReservationCount: ['task'],
  ReservationCountAggregate: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', '_all'],
  ReservationAvgAggregate: ['transno', 'custid', 'eventid', 'numtickets'],
  ReservationSumAggregate: ['transno', 'custid', 'eventid', 'numtickets'],
  ReservationMinAggregate: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  ReservationMaxAggregate: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  Saved_reportsCountAggregate: ['id', 'table_name', 'query_attr', '_all'],
  Saved_reportsAvgAggregate: ['id'],
  Saved_reportsSumAggregate: ['id'],
  Saved_reportsMinAggregate: ['id', 'table_name', 'query_attr'],
  Saved_reportsMaxAggregate: ['id', 'table_name', 'query_attr'],
  SeasonsCount: ['events', 'tickettype'],
  SeasonsCountAggregate: ['id', 'name', 'startdate', 'enddate', '_all'],
  SeasonsAvgAggregate: ['id'],
  SeasonsSumAggregate: ['id'],
  SeasonsMinAggregate: ['id', 'name', 'startdate', 'enddate'],
  SeasonsMaxAggregate: ['id', 'name', 'startdate', 'enddate'],
  TaskCount: ['other_task', 'task_notes'],
  TaskCountAggregate: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account', '_all'],
  TaskAvgAggregate: ['id', 'parent_id', 'assign_to', 'report_to', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskSumAggregate: ['id', 'parent_id', 'assign_to', 'report_to', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskMinAggregate: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskMaxAggregate: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  Task_notesCountAggregate: ['id', 'task_id', 'notes', 'date_created', '_all'],
  Task_notesAvgAggregate: ['id', 'task_id'],
  Task_notesSumAggregate: ['id', 'task_id'],
  Task_notesMinAggregate: ['id', 'task_id', 'notes', 'date_created'],
  Task_notesMaxAggregate: ['id', 'task_id', 'notes', 'date_created'],
  TicketsCountAggregate: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', '_all'],
  TicketsAvgAggregate: ['ticketno', 'type', 'eventinstanceid', 'custid'],
  TicketsSumAggregate: ['ticketno', 'type', 'eventinstanceid', 'custid'],
  TicketsMinAggregate: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TicketsMaxAggregate: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TickettypeCount: ['linkedtickets', 'tickets'],
  TickettypeCountAggregate: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions', '_all'],
  TickettypeAvgAggregate: ['id', 'seasonid', 'price', 'concessions'],
  TickettypeSumAggregate: ['id', 'seasonid', 'price', 'concessions'],
  TickettypeMinAggregate: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  TickettypeMaxAggregate: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  UsersCount: ['task_task_assign_toTousers', 'task_task_report_toTousers'],
  UsersCountAggregate: ['id', 'username', 'pass_hash', 'is_superadmin', '_all'],
  UsersAvgAggregate: ['id'],
  UsersSumAggregate: ['id'],
  UsersMinAggregate: ['id', 'username', 'pass_hash', 'is_superadmin'],
  UsersMaxAggregate: ['id', 'username', 'pass_hash', 'is_superadmin'],
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]['prototype'],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
    outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
        typeConfig,
        typeClass,
        typeTarget,
        outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  CustomersWhereInput: ['AND', 'OR', 'NOT', 'id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'task', 'tickets'],
  CustomersOrderByWithRelationInput: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'task', 'tickets'],
  CustomersWhereUniqueInput: ['id'],
  CustomersOrderByWithAggregationInput: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', '_count', '_avg', '_max', '_min', '_sum'],
  CustomersScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  DiscountsWhereInput: ['AND', 'OR', 'NOT', 'id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsOrderByWithRelationInput: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsWhereUniqueInput: ['id'],
  DiscountsOrderByWithAggregationInput: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events', '_count', '_avg', '_max', '_min', '_sum'],
  DiscountsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DonationsWhereInput: ['AND', 'OR', 'NOT', 'id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'customers', 'task'],
  DonationsOrderByWithRelationInput: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'customers', 'task'],
  DonationsWhereUniqueInput: ['id'],
  DonationsOrderByWithAggregationInput: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', '_count', '_avg', '_max', '_min', '_sum'],
  DonationsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  Event_instancesWhereInput: ['AND', 'OR', 'NOT', 'id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'linkedtickets', 'tickets'],
  Event_instancesOrderByWithRelationInput: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'linkedtickets', 'tickets'],
  Event_instancesWhereUniqueInput: ['id'],
  Event_instancesOrderByWithAggregationInput: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', '_count', '_avg', '_max', '_min', '_sum'],
  Event_instancesScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  EventsWhereInput: ['AND', 'OR', 'NOT', 'id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url', 'seasons', 'event_instances'],
  EventsOrderByWithRelationInput: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url', 'seasons', 'event_instances'],
  EventsWhereUniqueInput: ['id'],
  EventsOrderByWithAggregationInput: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url', '_count', '_avg', '_max', '_min', '_sum'],
  EventsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  LinkedticketsWhereInput: ['AND', 'OR', 'NOT', 'id', 'event_instance_id', 'ticket_type', 'dummy', 'event_instances', 'tickettype'],
  LinkedticketsOrderByWithRelationInput: ['id', 'event_instance_id', 'ticket_type', 'dummy', 'event_instances', 'tickettype'],
  LinkedticketsWhereUniqueInput: ['id'],
  LinkedticketsOrderByWithAggregationInput: ['id', 'event_instance_id', 'ticket_type', 'dummy', '_count', '_avg', '_max', '_min', '_sum'],
  LinkedticketsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'event_instance_id', 'ticket_type', 'dummy'],
  ReservationWhereInput: ['AND', 'OR', 'NOT', 'transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'customers', 'task'],
  ReservationOrderByWithRelationInput: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'customers', 'task'],
  ReservationWhereUniqueInput: ['transno'],
  ReservationOrderByWithAggregationInput: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', '_count', '_avg', '_max', '_min', '_sum'],
  ReservationScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  Saved_reportsWhereInput: ['AND', 'OR', 'NOT', 'id', 'table_name', 'query_attr'],
  Saved_reportsOrderByWithRelationInput: ['id', 'table_name', 'query_attr'],
  Saved_reportsWhereUniqueInput: ['id'],
  Saved_reportsOrderByWithAggregationInput: ['id', 'table_name', 'query_attr', '_count', '_avg', '_max', '_min', '_sum'],
  Saved_reportsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'table_name', 'query_attr'],
  SeasonsWhereInput: ['AND', 'OR', 'NOT', 'id', 'name', 'startdate', 'enddate', 'events', 'tickettype'],
  SeasonsOrderByWithRelationInput: ['id', 'name', 'startdate', 'enddate', 'events', 'tickettype'],
  SeasonsWhereUniqueInput: ['id'],
  SeasonsOrderByWithAggregationInput: ['id', 'name', 'startdate', 'enddate', '_count', '_avg', '_max', '_min', '_sum'],
  SeasonsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'name', 'startdate', 'enddate'],
  TaskWhereInput: ['AND', 'OR', 'NOT', 'id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskOrderByWithRelationInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskWhereUniqueInput: ['id'],
  TaskOrderByWithAggregationInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account', '_count', '_avg', '_max', '_min', '_sum'],
  TaskScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  Task_notesWhereInput: ['AND', 'OR', 'NOT', 'id', 'task_id', 'notes', 'date_created', 'task'],
  Task_notesOrderByWithRelationInput: ['id', 'task_id', 'notes', 'date_created', 'task'],
  Task_notesWhereUniqueInput: ['id'],
  Task_notesOrderByWithAggregationInput: ['id', 'task_id', 'notes', 'date_created', '_count', '_avg', '_max', '_min', '_sum'],
  Task_notesScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'task_id', 'notes', 'date_created'],
  TicketsWhereInput: ['AND', 'OR', 'NOT', 'ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'event_instances', 'tickettype'],
  TicketsOrderByWithRelationInput: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'event_instances', 'tickettype'],
  TicketsWhereUniqueInput: ['ticketno'],
  TicketsOrderByWithAggregationInput: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', '_count', '_avg', '_max', '_min', '_sum'],
  TicketsScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TickettypeWhereInput: ['AND', 'OR', 'NOT', 'id', 'name', 'isseason', 'seasonid', 'price', 'concessions', 'seasons', 'linkedtickets', 'tickets'],
  TickettypeOrderByWithRelationInput: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions', 'seasons', 'linkedtickets', 'tickets'],
  TickettypeWhereUniqueInput: ['id'],
  TickettypeOrderByWithAggregationInput: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions', '_count', '_avg', '_max', '_min', '_sum'],
  TickettypeScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  UsersWhereInput: ['AND', 'OR', 'NOT', 'id', 'username', 'pass_hash', 'is_superadmin', 'task_task_assign_toTousers', 'task_task_report_toTousers'],
  UsersOrderByWithRelationInput: ['id', 'username', 'pass_hash', 'is_superadmin', 'task_task_assign_toTousers', 'task_task_report_toTousers'],
  UsersWhereUniqueInput: ['id', 'username'],
  UsersOrderByWithAggregationInput: ['id', 'username', 'pass_hash', 'is_superadmin', '_count', '_avg', '_max', '_min', '_sum'],
  UsersScalarWhereWithAggregatesInput: ['AND', 'OR', 'NOT', 'id', 'username', 'pass_hash', 'is_superadmin'],
  CustomersCreateInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'task', 'tickets'],
  CustomersUpdateInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'task', 'tickets'],
  CustomersCreateManyInput: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  CustomersUpdateManyMutationInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  DiscountsCreateInput: ['code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsUpdateInput: ['code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsCreateManyInput: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsUpdateManyMutationInput: ['code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DonationsCreateInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'customers', 'task'],
  DonationsUpdateInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'customers', 'task'],
  DonationsCreateManyInput: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  DonationsUpdateManyMutationInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  Event_instancesCreateInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'linkedtickets', 'tickets'],
  Event_instancesUpdateInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'linkedtickets', 'tickets'],
  Event_instancesCreateManyInput: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesUpdateManyMutationInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  EventsCreateInput: ['eventname', 'eventdescription', 'active', 'image_url', 'seasons', 'event_instances'],
  EventsUpdateInput: ['eventname', 'eventdescription', 'active', 'image_url', 'seasons', 'event_instances'],
  EventsCreateManyInput: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  EventsUpdateManyMutationInput: ['eventname', 'eventdescription', 'active', 'image_url'],
  LinkedticketsCreateInput: ['dummy', 'event_instances', 'tickettype'],
  LinkedticketsUpdateInput: ['dummy', 'event_instances', 'tickettype'],
  LinkedticketsCreateManyInput: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  LinkedticketsUpdateManyMutationInput: ['dummy'],
  ReservationCreateInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'customers', 'task'],
  ReservationUpdateInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'customers', 'task'],
  ReservationCreateManyInput: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  ReservationUpdateManyMutationInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  Saved_reportsCreateInput: ['table_name', 'query_attr'],
  Saved_reportsUpdateInput: ['table_name', 'query_attr'],
  Saved_reportsCreateManyInput: ['id', 'table_name', 'query_attr'],
  Saved_reportsUpdateManyMutationInput: ['table_name', 'query_attr'],
  SeasonsCreateInput: ['name', 'startdate', 'enddate', 'events', 'tickettype'],
  SeasonsUpdateInput: ['name', 'startdate', 'enddate', 'events', 'tickettype'],
  SeasonsCreateManyInput: ['id', 'name', 'startdate', 'enddate'],
  SeasonsUpdateManyMutationInput: ['name', 'startdate', 'enddate'],
  TaskCreateInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskUpdateInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskCreateManyInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskUpdateManyMutationInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account'],
  Task_notesCreateInput: ['notes', 'date_created', 'task'],
  Task_notesUpdateInput: ['notes', 'date_created', 'task'],
  Task_notesCreateManyInput: ['id', 'task_id', 'notes', 'date_created'],
  Task_notesUpdateManyMutationInput: ['notes', 'date_created'],
  TicketsCreateInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'event_instances', 'tickettype'],
  TicketsUpdateInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'event_instances', 'tickettype'],
  TicketsCreateManyInput: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TicketsUpdateManyMutationInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TickettypeCreateInput: ['id', 'name', 'isseason', 'price', 'concessions', 'seasons', 'linkedtickets', 'tickets'],
  TickettypeUpdateInput: ['id', 'name', 'isseason', 'price', 'concessions', 'seasons', 'linkedtickets', 'tickets'],
  TickettypeCreateManyInput: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  TickettypeUpdateManyMutationInput: ['id', 'name', 'isseason', 'price', 'concessions'],
  UsersCreateInput: ['username', 'pass_hash', 'is_superadmin', 'task_task_assign_toTousers', 'task_task_report_toTousers'],
  UsersUpdateInput: ['username', 'pass_hash', 'is_superadmin', 'task_task_assign_toTousers', 'task_task_report_toTousers'],
  UsersCreateManyInput: ['id', 'username', 'pass_hash', 'is_superadmin'],
  UsersUpdateManyMutationInput: ['username', 'pass_hash', 'is_superadmin'],
  IntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  StringFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'mode', 'not'],
  StringNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'mode', 'not'],
  BoolNullableFilter: ['equals', 'not'],
  BoolFilter: ['equals', 'not'],
  DonationsListRelationFilter: ['every', 'some', 'none'],
  ReservationListRelationFilter: ['every', 'some', 'none'],
  TaskListRelationFilter: ['every', 'some', 'none'],
  TicketsListRelationFilter: ['every', 'some', 'none'],
  DonationsOrderByRelationAggregateInput: ['_count'],
  ReservationOrderByRelationAggregateInput: ['_count'],
  TaskOrderByRelationAggregateInput: ['_count'],
  TicketsOrderByRelationAggregateInput: ['_count'],
  CustomersCountOrderByAggregateInput: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  CustomersAvgOrderByAggregateInput: ['id'],
  CustomersMaxOrderByAggregateInput: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  CustomersMinOrderByAggregateInput: ['id', 'custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list'],
  CustomersSumOrderByAggregateInput: ['id'],
  IntWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  StringWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'mode', 'not', '_count', '_min', '_max'],
  StringNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'mode', 'not', '_count', '_min', '_max'],
  BoolNullableWithAggregatesFilter: ['equals', 'not', '_count', '_min', '_max'],
  BoolWithAggregatesFilter: ['equals', 'not', '_count', '_min', '_max'],
  DecimalNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  DateTimeNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  IntNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  DiscountsCountOrderByAggregateInput: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsAvgOrderByAggregateInput: ['id', 'amount', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsMaxOrderByAggregateInput: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsMinOrderByAggregateInput: ['id', 'code', 'amount', 'enddate', 'startdate', 'usagelimit', 'min_tickets', 'min_events'],
  DiscountsSumOrderByAggregateInput: ['id', 'amount', 'usagelimit', 'min_tickets', 'min_events'],
  DecimalNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  DateTimeNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_min', '_max'],
  IntNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  EnumfreqNullableFilter: ['equals', 'in', 'notIn', 'not'],
  CustomersRelationFilter: ['is', 'isNot'],
  DonationsCountOrderByAggregateInput: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  DonationsAvgOrderByAggregateInput: ['id', 'donorid', 'amount'],
  DonationsMaxOrderByAggregateInput: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  DonationsMinOrderByAggregateInput: ['id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  DonationsSumOrderByAggregateInput: ['id', 'donorid', 'amount'],
  EnumfreqNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'not', '_count', '_min', '_max'],
  EventsRelationFilter: ['is', 'isNot'],
  LinkedticketsListRelationFilter: ['every', 'some', 'none'],
  LinkedticketsOrderByRelationAggregateInput: ['_count'],
  Event_instancesCountOrderByAggregateInput: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesAvgOrderByAggregateInput: ['id', 'eventid', 'totalseats', 'availableseats'],
  Event_instancesMaxOrderByAggregateInput: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesMinOrderByAggregateInput: ['id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesSumOrderByAggregateInput: ['id', 'eventid', 'totalseats', 'availableseats'],
  SeasonsRelationFilter: ['is', 'isNot'],
  Event_instancesListRelationFilter: ['every', 'some', 'none'],
  Event_instancesOrderByRelationAggregateInput: ['_count'],
  EventsCountOrderByAggregateInput: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  EventsAvgOrderByAggregateInput: ['id', 'seasonid'],
  EventsMaxOrderByAggregateInput: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  EventsMinOrderByAggregateInput: ['id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  EventsSumOrderByAggregateInput: ['id', 'seasonid'],
  Event_instancesRelationFilter: ['is', 'isNot'],
  TickettypeRelationFilter: ['is', 'isNot'],
  LinkedticketsCountOrderByAggregateInput: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  LinkedticketsAvgOrderByAggregateInput: ['id', 'event_instance_id', 'ticket_type'],
  LinkedticketsMaxOrderByAggregateInput: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  LinkedticketsMinOrderByAggregateInput: ['id', 'event_instance_id', 'ticket_type', 'dummy'],
  LinkedticketsSumOrderByAggregateInput: ['id', 'event_instance_id', 'ticket_type'],
  ReservationCountOrderByAggregateInput: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  ReservationAvgOrderByAggregateInput: ['transno', 'custid', 'eventid', 'numtickets'],
  ReservationMaxOrderByAggregateInput: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  ReservationMinOrderByAggregateInput: ['transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  ReservationSumOrderByAggregateInput: ['transno', 'custid', 'eventid', 'numtickets'],
  Saved_reportsCountOrderByAggregateInput: ['id', 'table_name', 'query_attr'],
  Saved_reportsAvgOrderByAggregateInput: ['id'],
  Saved_reportsMaxOrderByAggregateInput: ['id', 'table_name', 'query_attr'],
  Saved_reportsMinOrderByAggregateInput: ['id', 'table_name', 'query_attr'],
  Saved_reportsSumOrderByAggregateInput: ['id'],
  EventsListRelationFilter: ['every', 'some', 'none'],
  TickettypeListRelationFilter: ['every', 'some', 'none'],
  EventsOrderByRelationAggregateInput: ['_count'],
  TickettypeOrderByRelationAggregateInput: ['_count'],
  SeasonsCountOrderByAggregateInput: ['id', 'name', 'startdate', 'enddate'],
  SeasonsAvgOrderByAggregateInput: ['id'],
  SeasonsMaxOrderByAggregateInput: ['id', 'name', 'startdate', 'enddate'],
  SeasonsMinOrderByAggregateInput: ['id', 'name', 'startdate', 'enddate'],
  SeasonsSumOrderByAggregateInput: ['id'],
  EnumstateNullableFilter: ['equals', 'in', 'notIn', 'not'],
  UsersRelationFilter: ['is', 'isNot'],
  TaskRelationFilter: ['is', 'isNot'],
  DonationsRelationFilter: ['is', 'isNot'],
  ReservationRelationFilter: ['is', 'isNot'],
  Task_notesListRelationFilter: ['every', 'some', 'none'],
  Task_notesOrderByRelationAggregateInput: ['_count'],
  TaskCountOrderByAggregateInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskAvgOrderByAggregateInput: ['id', 'parent_id', 'assign_to', 'report_to', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskMaxOrderByAggregateInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskMinOrderByAggregateInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskSumOrderByAggregateInput: ['id', 'parent_id', 'assign_to', 'report_to', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  EnumstateNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'not', '_count', '_min', '_max'],
  Task_notesCountOrderByAggregateInput: ['id', 'task_id', 'notes', 'date_created'],
  Task_notesAvgOrderByAggregateInput: ['id', 'task_id'],
  Task_notesMaxOrderByAggregateInput: ['id', 'task_id', 'notes', 'date_created'],
  Task_notesMinOrderByAggregateInput: ['id', 'task_id', 'notes', 'date_created'],
  Task_notesSumOrderByAggregateInput: ['id', 'task_id'],
  TicketsCountOrderByAggregateInput: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TicketsAvgOrderByAggregateInput: ['ticketno', 'type', 'eventinstanceid', 'custid'],
  TicketsMaxOrderByAggregateInput: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TicketsMinOrderByAggregateInput: ['ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  TicketsSumOrderByAggregateInput: ['ticketno', 'type', 'eventinstanceid', 'custid'],
  TickettypeCountOrderByAggregateInput: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  TickettypeAvgOrderByAggregateInput: ['id', 'seasonid', 'price', 'concessions'],
  TickettypeMaxOrderByAggregateInput: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  TickettypeMinOrderByAggregateInput: ['id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  TickettypeSumOrderByAggregateInput: ['id', 'seasonid', 'price', 'concessions'],
  UsersCountOrderByAggregateInput: ['id', 'username', 'pass_hash', 'is_superadmin'],
  UsersAvgOrderByAggregateInput: ['id'],
  UsersMaxOrderByAggregateInput: ['id', 'username', 'pass_hash', 'is_superadmin'],
  UsersMinOrderByAggregateInput: ['id', 'username', 'pass_hash', 'is_superadmin'],
  UsersSumOrderByAggregateInput: ['id'],
  DonationsCreateNestedManyWithoutCustomersInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  ReservationCreateNestedManyWithoutCustomersInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TaskCreateNestedManyWithoutCustomersInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TicketsCreateNestedManyWithoutCustomersInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  StringFieldUpdateOperationsInput: ['set'],
  NullableStringFieldUpdateOperationsInput: ['set'],
  NullableBoolFieldUpdateOperationsInput: ['set'],
  BoolFieldUpdateOperationsInput: ['set'],
  DonationsUpdateManyWithoutCustomersInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  ReservationUpdateManyWithoutCustomersInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TaskUpdateManyWithoutCustomersInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TicketsUpdateManyWithoutCustomersInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  IntFieldUpdateOperationsInput: ['set', 'increment', 'decrement', 'multiply', 'divide'],
  NullableDecimalFieldUpdateOperationsInput: ['set', 'increment', 'decrement', 'multiply', 'divide'],
  NullableDateTimeFieldUpdateOperationsInput: ['set'],
  NullableIntFieldUpdateOperationsInput: ['set', 'increment', 'decrement', 'multiply', 'divide'],
  CustomersCreateNestedOneWithoutDonationsInput: ['create', 'connectOrCreate', 'connect'],
  TaskCreateNestedManyWithoutDonationsInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  NullableEnumfreqFieldUpdateOperationsInput: ['set'],
  CustomersUpdateOneWithoutDonationsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  TaskUpdateManyWithoutDonationsInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  EventsCreateNestedOneWithoutEvent_instancesInput: ['create', 'connectOrCreate', 'connect'],
  LinkedticketsCreateNestedManyWithoutEvent_instancesInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TicketsCreateNestedManyWithoutEvent_instancesInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  EventsUpdateOneWithoutEvent_instancesInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  LinkedticketsUpdateManyWithoutEvent_instancesInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TicketsUpdateManyWithoutEvent_instancesInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  SeasonsCreateNestedOneWithoutEventsInput: ['create', 'connectOrCreate', 'connect'],
  Event_instancesCreateNestedManyWithoutEventsInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  SeasonsUpdateOneWithoutEventsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  Event_instancesUpdateManyWithoutEventsInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  Event_instancesCreateNestedOneWithoutLinkedticketsInput: ['create', 'connectOrCreate', 'connect'],
  TickettypeCreateNestedOneWithoutLinkedticketsInput: ['create', 'connectOrCreate', 'connect'],
  Event_instancesUpdateOneWithoutLinkedticketsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  TickettypeUpdateOneWithoutLinkedticketsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  CustomersCreateNestedOneWithoutReservationInput: ['create', 'connectOrCreate', 'connect'],
  TaskCreateNestedManyWithoutReservationInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  CustomersUpdateOneWithoutReservationInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  TaskUpdateManyWithoutReservationInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  EventsCreateNestedManyWithoutSeasonsInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TickettypeCreateNestedManyWithoutSeasonsInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  EventsUpdateManyWithoutSeasonsInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TickettypeUpdateManyWithoutSeasonsInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  UsersCreateNestedOneWithoutTask_task_assign_toTousersInput: ['create', 'connectOrCreate', 'connect'],
  TaskCreateNestedOneWithoutOther_taskInput: ['create', 'connectOrCreate', 'connect'],
  CustomersCreateNestedOneWithoutTaskInput: ['create', 'connectOrCreate', 'connect'],
  DonationsCreateNestedOneWithoutTaskInput: ['create', 'connectOrCreate', 'connect'],
  ReservationCreateNestedOneWithoutTaskInput: ['create', 'connectOrCreate', 'connect'],
  UsersCreateNestedOneWithoutTask_task_report_toTousersInput: ['create', 'connectOrCreate', 'connect'],
  TaskCreateNestedManyWithoutTaskInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  Task_notesCreateNestedManyWithoutTaskInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  NullableEnumstateFieldUpdateOperationsInput: ['set'],
  UsersUpdateOneWithoutTask_task_assign_toTousersInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  TaskUpdateOneWithoutOther_taskInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  CustomersUpdateOneWithoutTaskInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  DonationsUpdateOneWithoutTaskInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  ReservationUpdateOneWithoutTaskInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  UsersUpdateOneWithoutTask_task_report_toTousersInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  TaskUpdateManyWithoutTaskInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  Task_notesUpdateManyWithoutTaskInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TaskCreateNestedOneWithoutTask_notesInput: ['create', 'connectOrCreate', 'connect'],
  TaskUpdateOneWithoutTask_notesInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  CustomersCreateNestedOneWithoutTicketsInput: ['create', 'connectOrCreate', 'connect'],
  Event_instancesCreateNestedOneWithoutTicketsInput: ['create', 'connectOrCreate', 'connect'],
  TickettypeCreateNestedOneWithoutTicketsInput: ['create', 'connectOrCreate', 'connect'],
  CustomersUpdateOneWithoutTicketsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  Event_instancesUpdateOneWithoutTicketsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  TickettypeUpdateOneWithoutTicketsInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  SeasonsCreateNestedOneWithoutTickettypeInput: ['create', 'connectOrCreate', 'connect'],
  LinkedticketsCreateNestedManyWithoutTickettypeInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TicketsCreateNestedManyWithoutTickettypeInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  SeasonsUpdateOneWithoutTickettypeInput: ['create', 'connectOrCreate', 'upsert', 'disconnect', 'delete', 'connect', 'update'],
  LinkedticketsUpdateManyWithoutTickettypeInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TicketsUpdateManyWithoutTickettypeInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TaskCreateNestedManyWithoutUsers_task_assign_toTousersInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TaskCreateNestedManyWithoutUsers_task_report_toTousersInput: ['create', 'connectOrCreate', 'createMany', 'connect'],
  TaskUpdateManyWithoutUsers_task_assign_toTousersInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  TaskUpdateManyWithoutUsers_task_report_toTousersInput: ['create', 'connectOrCreate', 'upsert', 'createMany', 'set', 'disconnect', 'delete', 'connect', 'update', 'updateMany', 'deleteMany'],
  NestedIntFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedStringFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'not'],
  NestedStringNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'not'],
  NestedBoolNullableFilter: ['equals', 'not'],
  NestedBoolFilter: ['equals', 'not'],
  NestedIntWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  NestedFloatFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedStringWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'not', '_count', '_min', '_max'],
  NestedStringNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith', 'not', '_count', '_min', '_max'],
  NestedIntNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedBoolNullableWithAggregatesFilter: ['equals', 'not', '_count', '_min', '_max'],
  NestedBoolWithAggregatesFilter: ['equals', 'not', '_count', '_min', '_max'],
  NestedDecimalNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedDateTimeNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedDecimalNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  NestedDateTimeNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_min', '_max'],
  NestedIntNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not', '_count', '_avg', '_sum', '_min', '_max'],
  NestedFloatNullableFilter: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'],
  NestedEnumfreqNullableFilter: ['equals', 'in', 'notIn', 'not'],
  NestedEnumfreqNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'not', '_count', '_min', '_max'],
  NestedEnumstateNullableFilter: ['equals', 'in', 'notIn', 'not'],
  NestedEnumstateNullableWithAggregatesFilter: ['equals', 'in', 'notIn', 'not', '_count', '_min', '_max'],
  DonationsCreateWithoutCustomersInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'task'],
  DonationsCreateOrConnectWithoutCustomersInput: ['where', 'create'],
  DonationsCreateManyCustomersInputEnvelope: ['data', 'skipDuplicates'],
  ReservationCreateWithoutCustomersInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'task'],
  ReservationCreateOrConnectWithoutCustomersInput: ['where', 'create'],
  ReservationCreateManyCustomersInputEnvelope: ['data', 'skipDuplicates'],
  TaskCreateWithoutCustomersInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskCreateOrConnectWithoutCustomersInput: ['where', 'create'],
  TaskCreateManyCustomersInputEnvelope: ['data', 'skipDuplicates'],
  TicketsCreateWithoutCustomersInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'event_instances', 'tickettype'],
  TicketsCreateOrConnectWithoutCustomersInput: ['where', 'create'],
  TicketsCreateManyCustomersInputEnvelope: ['data', 'skipDuplicates'],
  DonationsUpsertWithWhereUniqueWithoutCustomersInput: ['where', 'update', 'create'],
  DonationsUpdateWithWhereUniqueWithoutCustomersInput: ['where', 'data'],
  DonationsUpdateManyWithWhereWithoutCustomersInput: ['where', 'data'],
  DonationsScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'donorid', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  ReservationUpsertWithWhereUniqueWithoutCustomersInput: ['where', 'update', 'create'],
  ReservationUpdateWithWhereUniqueWithoutCustomersInput: ['where', 'data'],
  ReservationUpdateManyWithWhereWithoutCustomersInput: ['where', 'data'],
  ReservationScalarWhereInput: ['AND', 'OR', 'NOT', 'transno', 'custid', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  TaskUpsertWithWhereUniqueWithoutCustomersInput: ['where', 'update', 'create'],
  TaskUpdateWithWhereUniqueWithoutCustomersInput: ['where', 'data'],
  TaskUpdateManyWithWhereWithoutCustomersInput: ['where', 'data'],
  TaskScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TicketsUpsertWithWhereUniqueWithoutCustomersInput: ['where', 'update', 'create'],
  TicketsUpdateWithWhereUniqueWithoutCustomersInput: ['where', 'data'],
  TicketsUpdateManyWithWhereWithoutCustomersInput: ['where', 'data'],
  TicketsScalarWhereInput: ['AND', 'OR', 'NOT', 'ticketno', 'type', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  CustomersCreateWithoutDonationsInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'reservation', 'task', 'tickets'],
  CustomersCreateOrConnectWithoutDonationsInput: ['where', 'create'],
  TaskCreateWithoutDonationsInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskCreateOrConnectWithoutDonationsInput: ['where', 'create'],
  TaskCreateManyDonationsInputEnvelope: ['data', 'skipDuplicates'],
  CustomersUpsertWithoutDonationsInput: ['update', 'create'],
  CustomersUpdateWithoutDonationsInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'reservation', 'task', 'tickets'],
  TaskUpsertWithWhereUniqueWithoutDonationsInput: ['where', 'update', 'create'],
  TaskUpdateWithWhereUniqueWithoutDonationsInput: ['where', 'data'],
  TaskUpdateManyWithWhereWithoutDonationsInput: ['where', 'data'],
  EventsCreateWithoutEvent_instancesInput: ['eventname', 'eventdescription', 'active', 'image_url', 'seasons'],
  EventsCreateOrConnectWithoutEvent_instancesInput: ['where', 'create'],
  LinkedticketsCreateWithoutEvent_instancesInput: ['dummy', 'tickettype'],
  LinkedticketsCreateOrConnectWithoutEvent_instancesInput: ['where', 'create'],
  LinkedticketsCreateManyEvent_instancesInputEnvelope: ['data', 'skipDuplicates'],
  TicketsCreateWithoutEvent_instancesInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'tickettype'],
  TicketsCreateOrConnectWithoutEvent_instancesInput: ['where', 'create'],
  TicketsCreateManyEvent_instancesInputEnvelope: ['data', 'skipDuplicates'],
  EventsUpsertWithoutEvent_instancesInput: ['update', 'create'],
  EventsUpdateWithoutEvent_instancesInput: ['eventname', 'eventdescription', 'active', 'image_url', 'seasons'],
  LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput: ['where', 'update', 'create'],
  LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput: ['where', 'data'],
  LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput: ['where', 'data'],
  LinkedticketsScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'event_instance_id', 'ticket_type', 'dummy'],
  TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput: ['where', 'update', 'create'],
  TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput: ['where', 'data'],
  TicketsUpdateManyWithWhereWithoutEvent_instancesInput: ['where', 'data'],
  SeasonsCreateWithoutEventsInput: ['name', 'startdate', 'enddate', 'tickettype'],
  SeasonsCreateOrConnectWithoutEventsInput: ['where', 'create'],
  Event_instancesCreateWithoutEventsInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'linkedtickets', 'tickets'],
  Event_instancesCreateOrConnectWithoutEventsInput: ['where', 'create'],
  Event_instancesCreateManyEventsInputEnvelope: ['data', 'skipDuplicates'],
  SeasonsUpsertWithoutEventsInput: ['update', 'create'],
  SeasonsUpdateWithoutEventsInput: ['name', 'startdate', 'enddate', 'tickettype'],
  Event_instancesUpsertWithWhereUniqueWithoutEventsInput: ['where', 'update', 'create'],
  Event_instancesUpdateWithWhereUniqueWithoutEventsInput: ['where', 'data'],
  Event_instancesUpdateManyWithWhereWithoutEventsInput: ['where', 'data'],
  Event_instancesScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'eventid', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesCreateWithoutLinkedticketsInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'tickets'],
  Event_instancesCreateOrConnectWithoutLinkedticketsInput: ['where', 'create'],
  TickettypeCreateWithoutLinkedticketsInput: ['id', 'name', 'isseason', 'price', 'concessions', 'seasons', 'tickets'],
  TickettypeCreateOrConnectWithoutLinkedticketsInput: ['where', 'create'],
  Event_instancesUpsertWithoutLinkedticketsInput: ['update', 'create'],
  Event_instancesUpdateWithoutLinkedticketsInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'tickets'],
  TickettypeUpsertWithoutLinkedticketsInput: ['update', 'create'],
  TickettypeUpdateWithoutLinkedticketsInput: ['id', 'name', 'isseason', 'price', 'concessions', 'seasons', 'tickets'],
  CustomersCreateWithoutReservationInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'task', 'tickets'],
  CustomersCreateOrConnectWithoutReservationInput: ['where', 'create'],
  TaskCreateWithoutReservationInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskCreateOrConnectWithoutReservationInput: ['where', 'create'],
  TaskCreateManyReservationInputEnvelope: ['data', 'skipDuplicates'],
  CustomersUpsertWithoutReservationInput: ['update', 'create'],
  CustomersUpdateWithoutReservationInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'task', 'tickets'],
  TaskUpsertWithWhereUniqueWithoutReservationInput: ['where', 'update', 'create'],
  TaskUpdateWithWhereUniqueWithoutReservationInput: ['where', 'data'],
  TaskUpdateManyWithWhereWithoutReservationInput: ['where', 'data'],
  EventsCreateWithoutSeasonsInput: ['eventname', 'eventdescription', 'active', 'image_url', 'event_instances'],
  EventsCreateOrConnectWithoutSeasonsInput: ['where', 'create'],
  EventsCreateManySeasonsInputEnvelope: ['data', 'skipDuplicates'],
  TickettypeCreateWithoutSeasonsInput: ['id', 'name', 'isseason', 'price', 'concessions', 'linkedtickets', 'tickets'],
  TickettypeCreateOrConnectWithoutSeasonsInput: ['where', 'create'],
  TickettypeCreateManySeasonsInputEnvelope: ['data', 'skipDuplicates'],
  EventsUpsertWithWhereUniqueWithoutSeasonsInput: ['where', 'update', 'create'],
  EventsUpdateWithWhereUniqueWithoutSeasonsInput: ['where', 'data'],
  EventsUpdateManyWithWhereWithoutSeasonsInput: ['where', 'data'],
  EventsScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'seasonid', 'eventname', 'eventdescription', 'active', 'image_url'],
  TickettypeUpsertWithWhereUniqueWithoutSeasonsInput: ['where', 'update', 'create'],
  TickettypeUpdateWithWhereUniqueWithoutSeasonsInput: ['where', 'data'],
  TickettypeUpdateManyWithWhereWithoutSeasonsInput: ['where', 'data'],
  TickettypeScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'name', 'isseason', 'seasonid', 'price', 'concessions'],
  UsersCreateWithoutTask_task_assign_toTousersInput: ['username', 'pass_hash', 'is_superadmin', 'task_task_report_toTousers'],
  UsersCreateOrConnectWithoutTask_task_assign_toTousersInput: ['where', 'create'],
  TaskCreateWithoutOther_taskInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'task_notes'],
  TaskCreateOrConnectWithoutOther_taskInput: ['where', 'create'],
  CustomersCreateWithoutTaskInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'tickets'],
  CustomersCreateOrConnectWithoutTaskInput: ['where', 'create'],
  DonationsCreateWithoutTaskInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'customers'],
  DonationsCreateOrConnectWithoutTaskInput: ['where', 'create'],
  ReservationCreateWithoutTaskInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'customers'],
  ReservationCreateOrConnectWithoutTaskInput: ['where', 'create'],
  UsersCreateWithoutTask_task_report_toTousersInput: ['username', 'pass_hash', 'is_superadmin', 'task_task_assign_toTousers'],
  UsersCreateOrConnectWithoutTask_task_report_toTousersInput: ['where', 'create'],
  TaskCreateWithoutTaskInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskCreateOrConnectWithoutTaskInput: ['where', 'create'],
  TaskCreateManyTaskInputEnvelope: ['data', 'skipDuplicates'],
  Task_notesCreateWithoutTaskInput: ['notes', 'date_created'],
  Task_notesCreateOrConnectWithoutTaskInput: ['where', 'create'],
  Task_notesCreateManyTaskInputEnvelope: ['data', 'skipDuplicates'],
  UsersUpsertWithoutTask_task_assign_toTousersInput: ['update', 'create'],
  UsersUpdateWithoutTask_task_assign_toTousersInput: ['username', 'pass_hash', 'is_superadmin', 'task_task_report_toTousers'],
  TaskUpsertWithoutOther_taskInput: ['update', 'create'],
  TaskUpdateWithoutOther_taskInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'task_notes'],
  CustomersUpsertWithoutTaskInput: ['update', 'create'],
  CustomersUpdateWithoutTaskInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'tickets'],
  DonationsUpsertWithoutTaskInput: ['update', 'create'],
  DonationsUpdateWithoutTaskInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'customers'],
  ReservationUpsertWithoutTaskInput: ['update', 'create'],
  ReservationUpdateWithoutTaskInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'customers'],
  UsersUpsertWithoutTask_task_report_toTousersInput: ['update', 'create'],
  UsersUpdateWithoutTask_task_report_toTousersInput: ['username', 'pass_hash', 'is_superadmin', 'task_task_assign_toTousers'],
  TaskUpsertWithWhereUniqueWithoutTaskInput: ['where', 'update', 'create'],
  TaskUpdateWithWhereUniqueWithoutTaskInput: ['where', 'data'],
  TaskUpdateManyWithWhereWithoutTaskInput: ['where', 'data'],
  Task_notesUpsertWithWhereUniqueWithoutTaskInput: ['where', 'update', 'create'],
  Task_notesUpdateWithWhereUniqueWithoutTaskInput: ['where', 'data'],
  Task_notesUpdateManyWithWhereWithoutTaskInput: ['where', 'data'],
  Task_notesScalarWhereInput: ['AND', 'OR', 'NOT', 'id', 'task_id', 'notes', 'date_created'],
  TaskCreateWithoutTask_notesInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task'],
  TaskCreateOrConnectWithoutTask_notesInput: ['where', 'create'],
  TaskUpsertWithoutTask_notesInput: ['update', 'create'],
  TaskUpdateWithoutTask_notesInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task'],
  CustomersCreateWithoutTicketsInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'task'],
  CustomersCreateOrConnectWithoutTicketsInput: ['where', 'create'],
  Event_instancesCreateWithoutTicketsInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'linkedtickets'],
  Event_instancesCreateOrConnectWithoutTicketsInput: ['where', 'create'],
  TickettypeCreateWithoutTicketsInput: ['id', 'name', 'isseason', 'price', 'concessions', 'seasons', 'linkedtickets'],
  TickettypeCreateOrConnectWithoutTicketsInput: ['where', 'create'],
  CustomersUpsertWithoutTicketsInput: ['update', 'create'],
  CustomersUpdateWithoutTicketsInput: ['custname', 'email', 'phone', 'custaddress', 'newsletter', 'donorbadge', 'seatingaccom', 'vip', 'volunteer_list', 'donations', 'reservation', 'task'],
  Event_instancesUpsertWithoutTicketsInput: ['update', 'create'],
  Event_instancesUpdateWithoutTicketsInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'events', 'linkedtickets'],
  TickettypeUpsertWithoutTicketsInput: ['update', 'create'],
  TickettypeUpdateWithoutTicketsInput: ['id', 'name', 'isseason', 'price', 'concessions', 'seasons', 'linkedtickets'],
  SeasonsCreateWithoutTickettypeInput: ['name', 'startdate', 'enddate', 'events'],
  SeasonsCreateOrConnectWithoutTickettypeInput: ['where', 'create'],
  LinkedticketsCreateWithoutTickettypeInput: ['dummy', 'event_instances'],
  LinkedticketsCreateOrConnectWithoutTickettypeInput: ['where', 'create'],
  LinkedticketsCreateManyTickettypeInputEnvelope: ['data', 'skipDuplicates'],
  TicketsCreateWithoutTickettypeInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'event_instances'],
  TicketsCreateOrConnectWithoutTickettypeInput: ['where', 'create'],
  TicketsCreateManyTickettypeInputEnvelope: ['data', 'skipDuplicates'],
  SeasonsUpsertWithoutTickettypeInput: ['update', 'create'],
  SeasonsUpdateWithoutTickettypeInput: ['name', 'startdate', 'enddate', 'events'],
  LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput: ['where', 'update', 'create'],
  LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput: ['where', 'data'],
  LinkedticketsUpdateManyWithWhereWithoutTickettypeInput: ['where', 'data'],
  TicketsUpsertWithWhereUniqueWithoutTickettypeInput: ['where', 'update', 'create'],
  TicketsUpdateWithWhereUniqueWithoutTickettypeInput: ['where', 'data'],
  TicketsUpdateManyWithWhereWithoutTickettypeInput: ['where', 'data'],
  TaskCreateWithoutUsers_task_assign_toTousersInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskCreateOrConnectWithoutUsers_task_assign_toTousersInput: ['where', 'create'],
  TaskCreateManyUsers_task_assign_toTousersInputEnvelope: ['data', 'skipDuplicates'],
  TaskCreateWithoutUsers_task_report_toTousersInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'other_task', 'task_notes'],
  TaskCreateOrConnectWithoutUsers_task_report_toTousersInput: ['where', 'create'],
  TaskCreateManyUsers_task_report_toTousersInputEnvelope: ['data', 'skipDuplicates'],
  TaskUpsertWithWhereUniqueWithoutUsers_task_assign_toTousersInput: ['where', 'update', 'create'],
  TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput: ['where', 'data'],
  TaskUpdateManyWithWhereWithoutUsers_task_assign_toTousersInput: ['where', 'data'],
  TaskUpsertWithWhereUniqueWithoutUsers_task_report_toTousersInput: ['where', 'update', 'create'],
  TaskUpdateWithWhereUniqueWithoutUsers_task_report_toTousersInput: ['where', 'data'],
  TaskUpdateManyWithWhereWithoutUsers_task_report_toTousersInput: ['where', 'data'],
  DonationsCreateManyCustomersInput: ['id', 'isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate'],
  ReservationCreateManyCustomersInput: ['transno', 'eventid', 'eventname', 'eventdate', 'showtime', 'numtickets'],
  TaskCreateManyCustomersInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TicketsCreateManyCustomersInput: ['ticketno', 'type', 'eventinstanceid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  DonationsUpdateWithoutCustomersInput: ['isanonymous', 'amount', 'dononame', 'frequency', 'comments', 'donodate', 'task'],
  ReservationUpdateWithoutCustomersInput: ['eventid', 'eventname', 'eventdate', 'showtime', 'numtickets', 'task'],
  TaskUpdateWithoutCustomersInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TicketsUpdateWithoutCustomersInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'event_instances', 'tickettype'],
  TaskCreateManyDonationsInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_ticket_order', 'rel_account'],
  TaskUpdateWithoutDonationsInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  LinkedticketsCreateManyEvent_instancesInput: ['id', 'ticket_type', 'dummy'],
  TicketsCreateManyEvent_instancesInput: ['ticketno', 'type', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  LinkedticketsUpdateWithoutEvent_instancesInput: ['dummy', 'tickettype'],
  TicketsUpdateWithoutEvent_instancesInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'tickettype'],
  Event_instancesCreateManyEventsInput: ['id', 'eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri'],
  Event_instancesUpdateWithoutEventsInput: ['eventdate', 'starttime', 'salestatus', 'totalseats', 'availableseats', 'purchaseuri', 'linkedtickets', 'tickets'],
  TaskCreateManyReservationInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_account'],
  TaskUpdateWithoutReservationInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  EventsCreateManySeasonsInput: ['id', 'eventname', 'eventdescription', 'active', 'image_url'],
  TickettypeCreateManySeasonsInput: ['id', 'name', 'isseason', 'price', 'concessions'],
  EventsUpdateWithoutSeasonsInput: ['eventname', 'eventdescription', 'active', 'image_url', 'event_instances'],
  TickettypeUpdateWithoutSeasonsInput: ['id', 'name', 'isseason', 'price', 'concessions', 'linkedtickets', 'tickets'],
  TaskCreateManyTaskInput: ['id', 'subject', 'description', 'status', 'assign_to', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  Task_notesCreateManyTaskInput: ['id', 'notes', 'date_created'],
  TaskUpdateWithoutTaskInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  Task_notesUpdateWithoutTaskInput: ['notes', 'date_created'],
  LinkedticketsCreateManyTickettypeInput: ['id', 'event_instance_id', 'dummy'],
  TicketsCreateManyTickettypeInput: ['ticketno', 'eventinstanceid', 'custid', 'paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments'],
  LinkedticketsUpdateWithoutTickettypeInput: ['dummy', 'event_instances'],
  TicketsUpdateWithoutTickettypeInput: ['paid', 'active', 'checkedin', 'checkedin_ts', 'payment_intent', 'comments', 'customers', 'event_instances'],
  TaskCreateManyUsers_task_assign_toTousersInput: ['id', 'parent_id', 'subject', 'description', 'status', 'report_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskCreateManyUsers_task_report_toTousersInput: ['id', 'parent_id', 'subject', 'description', 'status', 'assign_to', 'date_created', 'date_assigned', 'due_date', 'rel_contact', 'rel_donation', 'rel_ticket_order', 'rel_account'],
  TaskUpdateWithoutUsers_task_assign_toTousersInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'task', 'customers', 'donations', 'reservation', 'users_task_report_toTousers', 'other_task', 'task_notes'],
  TaskUpdateWithoutUsers_task_report_toTousersInput: ['subject', 'description', 'status', 'date_created', 'date_assigned', 'due_date', 'rel_account', 'users_task_assign_toTousers', 'task', 'customers', 'donations', 'reservation', 'other_task', 'task_notes'],
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]['prototype'],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
    inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
        typeConfig,
        typeClass,
        typeTarget,
        inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

