import {Request, Response, Router} from 'express';
import {checkJwt, checkScopes} from '../../auth';
import {create, findById, findAll, findByName, findByDonationDate, remove, update}
  from './donations.service';

export const donationsRouter = Router();

donationsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newDonation = await create(req.body);
    const code = newDonation.status.success ? 200 : 404;
    res.status(code).send(newDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// remaining routes are all private and require user to have admin scope
donationsRouter.use(checkJwt);
donationsRouter.use(checkScopes);

/**
 * @swagger
 * /1/donations:
 *   get:
 *     summary: Retrieves all donations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all donations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       contactid_fk:
 *                         type: integer
 *                       isanonymous:
 *                         type: boolean
 *                       amount:
 *                         type: number
 *                         format: float
 *                       donorname:
 *                         type: string
 *                       frequency:
 *                         type: string
 *                       comments:
 *                         type: string
 *                       payment_intent:
 *                         type: string
 *                       refund_intent:
 *                         type: string
 *                       donationdate:
 *                         type: integer
 *                       donationid:
 *                         type: integer
 *       '404':
 *         description: No donations were found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Donations
 */
donationsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await findAll();
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /1/donations/search:
 *   get:
 *     summary: Search for donations by donor name.
 *     description: Retrieve donation info based on donor full name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the donor to search for.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of donations matching the given donor name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contactid_fk:
 *                         type: integer
 *                       isanonymous:
 *                         type: boolean
 *                       amount:
 *                         type: number
 *                         format: float
 *                       donorname:
 *                         type: string
 *                       frequency:
 *                         type: string
 *                       comments:
 *                         type: string
 *                       payment_intent:
 *                         type: string
 *                       refund_intent:
 *                         type: string
 *                       donationdate:
 *                         type: integer
 *                       donationid:
 *                         type: integer
 *       '404':
 *         description: No donations found with the given donor name.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Donations
 */
donationsRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const donations = await findByName(req.query.name as string);
    const code = donations.status.success ? 200 : 404;
    res.status(code).send(donations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /1/donations/{id}:
 *   get:
 *     summary: Get a donation by ID.
 *     description: Retrieve a donation based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the donation to retrieve.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The donation with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contactid_fk:
 *                         type: integer
 *                       isanonymous:
 *                         type: boolean
 *                       amount:
 *                         type: number
 *                         format: float
 *                       donorname:
 *                         type: string
 *                       frequency:
 *                         type: string
 *                       comments:
 *                         type: string
 *                       payment_intent:
 *                         type: string
 *                       refund_intent:
 *                         type: string
 *                       donationdate:
 *                         type: integer
 *                       donationid:
 *                         type: integer
 *       '404':
 *         description: No donation found with the given ID.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Donations
 */
donationsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await findById(req.params.id);
    let code = donation.status.success ? 200 : 404;
    if (code === 200 && donation.data.length === 0) {
      code = 404;
      donation.status.success = false;
    }
    res.status(code).send(donation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /1/donations/date/{donationdate}:
 *   get:
 *     summary: Get a donation by Donation Date.
 *     description: Retrieve a donation based on its Donation Date.
 *     parameters:
 *       - in: path
 *         name: donationdate
 *         schema:
 *           type: integer
 *         description: The Donation Date of the donation to retrieve.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The donation with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contactid_fk:
 *                         type: integer
 *                       isanonymous:
 *                         type: boolean
 *                       amount:
 *                         type: number
 *                         format: float
 *                       donorname:
 *                         type: string
 *                       frequency:
 *                         type: string
 *                       comments:
 *                         type: string
 *                       payment_intent:
 *                         type: string
 *                       refund_intent:
 *                         type: string
 *                       donationdate:
 *                         type: integer
 *                       donationid:
 *                         type: integer
 *       '404':
 *         description: No donation found with the given ID.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Donations
 */
donationsRouter.get('/date/:donationdate', async (req: Request, res: Response) => {
  try {
    const donation = await findByDonationDate(req.params.donationdate);
    let code = donation.status.success ? 200 : 404;
    if (code === 200 && donation.data.length === 0) {
      code = 404;
      donation.status.success = false;
    }
    res.status(code).send(donation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});


/**
 * @swagger
 * /1/donations/{id}:
 *   delete:
 *     summary: Delete a donation by ID.
 *     description: Delete a single donation based on its ID.
 *     parameters:
 *       - in: path
 *         name: donationid
 *         schema:
 *           type: integer
 *         description: The ID of the donation to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The donation with the ID was deleted.
 *       '404':
 *         description: No donation found with the ID given.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Donations
 */
donationsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removedDonations = await remove(req.params.id);
    let code = removedDonations.status.success ? 200 : 404;
    if (code === 200 && removedDonations.data.length === 0) {
      code = 404;
      removedDonations.status.success = false;
    }
    res.status(code).send(removedDonations);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/**
 * @swagger
 * /1/donations/{id}:
 *   put:
 *     summary: Update a donation
 *     description: Update a donation by donation ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The donationid.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: donation
 *         description: Variables to update
 *         schema:
 *           type: object
 *           properties:
 *             contactid_fk:
 *               type: integer
 *             isanonymous:
 *               type: boolean
 *             amount:
 *               type: integer
 *             donorname:
 *               type: string
 *             frequency:
 *               type: string
 *             comments:
 *               type: string
 *             payment_intent:
 *               type: string
 *             donationdate:
 *               type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated donation
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Whether the operation was successful or not.
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   donationid:
 *                     type: integer
 *                   contactid_fk:
 *                     type: integer
 *                   isanonymous:
 *                     type: boolean
 *                   amount:
 *                     type: integer
 *                   donorname:
 *                     type: string
 *                   frequency:
 *                     type: string
 *                   comments:
 *                     type: string
 *                   payment_intent:
 *                     type: string
 *                   donationdate:
 *                     type: integer
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Donations
 */
donationsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDonation = await update(req);
    let code = updatedDonation.status.success ? 200 : 404;
    if (code === 200 && updatedDonation.data.length === 0) {
      code = 404;
      updatedDonation.status.success = false;
    }
    res.status(code).send(updatedDonation);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});