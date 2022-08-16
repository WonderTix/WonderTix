import {response, buildResponse} from '../db';

export const getNewsletterCount = async (params: any): Promise<response> => {
    const emails = await pool.query(
        'SELECT COUNT(*) FROM customers WHERE email = $1',
        [req.body.email],
    );
    const myQuery = {
        text: 'SELECT COUNT(*) FROM customers WHERE email = $1',
        values: params.email,
    }
    return buildResponse(myQuery, 'GET');
}