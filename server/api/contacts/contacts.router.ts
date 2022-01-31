// api/contacts/contacts.router.ts

import { Router } from 'express';
import { findAll, find } from './contacts.service';

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

// GET /api/contacts/:id
contactsRouter.get('/:id', async (req, res) => {
  try {
    const customer = await find(req.params.id);
    res.status(200).send(customer.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
