import {Router, Request, Response} from 'express';
import {checkJwt, checkScopes} from '../auth';
import {Prisma} from '@prisma/client';
import {extendPrismaClient} from './PrismaClient/GetExtendedPrismaClient';
import {LoadedTicketRestriction} from './eventInstanceController.service';
import {parseIntToDate} from '../api/db';

const prisma = extendPrismaClient();

export const ticketRestrictionController = Router();

const getDate = (time: string, date: number) => {
  const [hour, min] = time.split('T')[1].split(':');
  const newDate = parseIntToDate(date);
  newDate.setHours(+hour, +min);
  return newDate.toJSON();
};

/**
 * @swagger
 *  /2/tickets:
 *    get:
 *      summary: get available tickets
 *      tags:
 *        - Tickets
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        byId:
 *                          type: object
 *                          properties:
 *                            ticketid:
 *                              type: object
 *                              properties:
 *                                event_instance_id: {type: integer}
 *                                eventid: {type: integer}
 *                                totalseats: {type: integer}
 *                                availableseats: {type: integer}
 *                                admission_type: {type: string}
 *                                ticket_price: {type: integer}
 *                                concession_price: {type: integer}
 *                                date: {type: string}
 *                        allIds: {type: array, items: {type: integer}}
 *                  status:
 *                    type: object
 *                    properties:
 *                      success: {type: boolean}
 *                      message: {type: string}
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 */

ticketRestrictionController.get('/tickets', async (req: Request, res: Response) => {
  try {
    const ticketRestrictions = await prisma.ticketrestrictions.findMany({
      where: {
        eventtickets: {
          some: {
            singleticket_fk: null,
          },
        },
        eventinstances: {
          deletedat: null,
          salestatus: true,
          availableseats: {gt: 0},
        },
      },
      include: {
        eventinstances: true,
        tickettype: true,
      },
    });

    const allIds:number[] = [];
    let byId = {};
    ticketRestrictions.forEach((restriction) => {
      if (allIds.includes(restriction.eventinstances.eventinstanceid)) return;
      allIds.push(restriction.eventinstances.eventinstanceid);
      byId = {...byId, [restriction.eventinstances.eventinstanceid]: {
        event_instance_id: restriction.eventinstances.eventinstanceid,
        eventid: String(restriction.eventinstances.eventid_fk),
        date: getDate(restriction.eventinstances.eventtime.toISOString(), restriction.eventinstances.eventdate),
        totalseats: restriction.eventinstances.totalseats,
        availableseats: restriction.eventinstances.availableseats,
        admission_type: restriction.tickettype.description,
        ticket_price: restriction.price,
        concession_price: restriction.concessionprice,
      }};
    });
    res.send({data: {allIds, byId}});
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).send({error: error.message});
      return;
    }
    res.status(500).send({error: 'Internal Server Error'});
  }
});
/**
 * @swagger
 * /2/ticket-restriction:
 *   get:
 *     summary: get all Ticket Restrictions
 *     tags:
 *     - New Ticket Restrictions
 *     responses:
 *       200:
 *         description: ticket restriction updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/TicketRestriction'
 *       400:
 *         description: bad request
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
ticketRestrictionController.get('/', async (req: Request, res: Response) => {
  try {
    const ticketRestrictions = await prisma.ticketrestrictions.findMany({
      where: {
        eventinstances: {
          deletedat: null,
          events: {
            active: true,
          },
        },
        eventtickets: {
          some: {
            singleticket_fk: null,
          },
        },
      },
      include: {
        eventtickets: {
          where: {
            singleticket_fk: {not: null},
          },
        },
      },
    });
    return res.status(200).json(
        ticketRestrictions
            .map((restriction) => ({
              id: restriction.ticketrestrictionsid,
              eventinstanceid: restriction.eventinstanceid_fk,
              tickettypeid: restriction.tickettypeid_fk,
              ticketssold: restriction.eventtickets.length,
              concessionprice: +restriction.concessionprice,
              price: +restriction.price,
              ticketlimit: restriction.ticketlimit,
            })));
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    res.status(500).json({error: 'Internal Server Error'});
  }
});

ticketRestrictionController.get('/:id', async (req: Request, res: Response) => {
  try {
    const {id}= req.params;

    const ticketRestrictions = await prisma.ticketrestrictions.findMany({
      where: {
        eventinstanceid_fk: +id,
        eventtickets: {
          some: {singleticket_fk: null},
        },
      },
      include: {
        eventtickets: {
          where: {
            singleticket_fk: {not: null},
          },
        },
      },
    });
    return res.status(200).json(
        ticketRestrictions.map((restriction) => {
          const {eventtickets, ...restrictionData} = restriction;
          return {
            ...restrictionData,
            ticketssold: eventtickets.length,
          };
        }));
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    res.status(500).json({error: 'Internal Server Error'});
  }
});

ticketRestrictionController.get('/:id/:tickettypeid', async (req: Request, res: Response) => {
  try {
    const {id, tickettypeid} = req.params;

    const ticketRestriction: LoadedTicketRestriction | null = await prisma.ticketrestrictions.findFirst({
      where: {
        eventinstanceid_fk: +id,
        tickettypeid_fk: +tickettypeid,
        eventtickets: {
          some: {singleticket_fk: null},
        },
      },
      include: {
        eventtickets: {
          where: {
            singleticket_fk: {not: null},
          },
        },
      },
    });
    if (!ticketRestriction) {
      return res.status(400).json({error: `Ticket type ${tickettypeid} not available for showing ${id}`});
    }
    const {eventtickets, ...restrictionData} = ticketRestriction;
    return res.status(200).json({
      ...restrictionData,
      ticketssold: eventtickets.length,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({error: error.message});
      return;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({error: error.message});
      return;
    }
    res.status(500).json({error: 'Internal Server Error'});
  }
});

ticketRestrictionController.use(checkJwt);
ticketRestrictionController.use(checkScopes);
