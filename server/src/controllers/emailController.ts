import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma, state} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import nodemailer from 'nodemailer';

const prisma = extendPrismaClient();

export const emailController = Router();

emailController.use(checkJwt);
emailController.use(checkScopes);

// const nodemailer = require('nodemailer');

async function getContactsList(req: Request, res: Response) {
  try {
    const filters: any = [];
    // Add filter for newsletter property set to true
    filters.push({
      newsletter: {
        equals: true,
      },
    });

    let contacts;

    if (filters.length > 0) {
      contacts = await prisma.contacts.findMany();
    } else {
      contacts = await prisma.contacts.findMany();
    }

    res.status(200).json(contacts);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      res.status(400).json({error: error.message});
    } else {
      res.status(500).json({error: 'Internal Server Error'});
    }
  }
}

// Configure the transport object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Use 465 for SSL
  secure: false, // Set to true if using port 465
  auth: {
    user: 'username@email.com', // Replace with your email
    pass: 'password', // Replace with your application-specific password
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Wondertix" <username@email.com>`, // Sender's address
    to: to, // List of receivers
    subject: subject, // Subject line
    html: html, // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Using an IIFE to call async functions
/*
(async () => {
  await sendEmail(
    'emailswondertix@gmail.com',
    'Test Subject',
    'This is a plain text body',
    '<p>Wondertix test email body</p>',
  );
})();
*/

/**
 * @swagger
 * /2/contact/emails:
 *   post:
 *     summary: send emails of contacts subscribed to the newsletter
 *     tags:
 *       - Contact Emails
 *     responses:
 *       200:
 *         description: send of contacts subscribed to the newsletter received successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the contact.
 *                   email:
 *                     type: string
 *                     description: The email address of the contact.
 *       400:
 *         description: Bad request. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message from the server.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */
emailController.post('/emails', async (req: Request, res: Response) => {
  console.log('POST request received at /emails'); // Add this line to log the request
  try {
    const filters: any = [];
    // Add filter for newsletter property set to true
    filters.push({
      newsletter: {
        equals: true,
      },
    });

    let contacts;
    if (filters.length > 0) {
      contacts = await prisma.contacts.findMany({
        where: {
          AND: filters, // Apply filters using AND condition
        },
      });
    } else {
      contacts = await prisma.contacts.findMany(); // Fetch all contacts if no filters applied
    }

    res.status(200).json(contacts);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      res.status(400).json({error: error.message});
    } else {
      res.status(500).json({error: 'Internal Server Error'});
    }
  }
});
