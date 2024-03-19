import {Pool} from 'pg';

/**
 * TicketType class
 * @class TicketType
 */
export default class TicketType {
  private _pool: Pool;
  private _id: number = 0;
  private _description: string = '';
  private _price: number = 0;
  private _fee: number = 0;
  private _deprecated: boolean = false;

  /**
   * TicketType constructor
   * @param {Pool} pool - database pool connection object
   */
  constructor(pool: Pool) {
    this._pool = pool;
  }

  /**
   * Get the id of the ticket type
   * @return {number}
   */
  get id(): number {
    return this._id;
  }

  /**
   * Set the id of the ticket type
   * @param {number} value
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Get the description of the ticket type
   * @return {string}
   */
  get description(): string {
    return this._description;
  }

  /**
   * Set the description of the ticket type
   * @param {string} value
   */
  set description(value: string) {
    this._description = value;
  }

  /**
   * Get the price of the ticket type
   * @return {decimal}
   */
  get price(): number {
    return this._price;
  }

  /**
   * Set the price of the ticket type
   * @param {number} value
   */
  set price(value: number) {
    this._price = value;
  }

  /**
   * Get the fee of the ticket type
   * @return {number}
   */
  get fee(): number {
    return this._fee;
  }

  /**
   * Set the fee of the ticket type
   * @param {number} value
   */
  set fee(value: number) {
    this._fee = value;
  }

  /**
   * Get the deprecated flag of the ticket type
   * @return {boolean}
   */
  get deprecated(): boolean {
    return this._deprecated;
  }

  /**
   * Set the deprecated flag of the ticket type
   * @param {boolean} value
   */
  set deprecated(value: boolean) {
    this._deprecated = value;
  }

  /**
   * Create a new ticket type
   * @param {Pool} pool - database pool connection object
   * @param {Number} id - id of the ticket type
   * @return {boolean|TicketType} - false if ticket type not found, otherwise the ticket type
   */
  static async find(pool: Pool, id: number): Promise<boolean|TicketType> {
    const result = await pool.query(
        `SELECT tickettypeid, description, price, fee, deprecated 
        FROM tickettype 
        WHERE tickettypeid = $1`,
        [id],
    );

    if (result.rowCount === 0) {
      return false;
    }

    const ticketType = new TicketType(pool);
    ticketType.id = result.rows[0].tickettypeid;
    ticketType.description = result.rows[0].description;
    ticketType.price = result.rows[0].price;
    ticketType.fee = result.rows[0].fee;
    ticketType.deprecated = result.rows[0].deprecated;

    return ticketType;
  }

  /**
   * Update an existing ticket type
   */
  async update(): Promise<boolean> {
    await this._pool.query(
        `UPDATE 
        tickettype 
      SET
        description = $2,
        price = $3,
        fee = $4,
        deprecated = $5
      WHERE 
        tickettypeid = $1;`,
        [
          this.id,
          this.description,
          this.price,
          this.fee,
          this.deprecated,
        ]);

    return true;
  }
}
