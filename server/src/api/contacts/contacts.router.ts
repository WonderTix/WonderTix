// api/contacts/contacts.router.ts

import {Router} from 'express';
import {create, find, findAll, findByName, remove, update}
  from './contacts.service';

export const contactsRouter = Router();

// GET /api/contacts
contactsRouter.get('/', async (req, res) => {
  try {
    const contacts = await findAll();
    res.status(200).send(contacts.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/contacts/search?name={name}
contactsRouter.get('/search', async (req, res) => {
  try {
    const contacts = await findByName(req.query.name as string);
    res.status(200).send(contacts.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET /api/contacts/:id
contactsRouter.get('/:id', async (req, res) => {
  try {
    const customer = await find(req.params.id);
    res.status(200).send(customer.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST /api/contacts
contactsRouter.post('/', async (req, res) => {
  try {
    const newContact = await create(req.body);
    res.status(201).send(newContact.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/contacts/:id
contactsRouter.delete('/:id', async (req, res) => {
  try {
    await remove(req.params.id);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT /api/contacts/:id
contactsRouter.put('/:id', async (req, res) => {
  try {
    const updatedContact = await update(req);
    res.status(204).send(updatedContact.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
