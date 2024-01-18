import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../middlewares';
import { connector } from '../../database/mysql-connect';
import { userResgistrate } from '../../models/insertUserModel';
import { userValidation } from '../../schemas';


export const createValidation = validation({
  body: userValidation,
});

export const create: RequestHandler = async (req, res, next) => {
  const data = userResgistrate(req, res, next);
  console.log(data);
  try {
    const insertId = await connector.insertData(data);
    console.log(`Data inserted with ID: ${insertId}`);
    res.status(StatusCodes.CREATED).json({ id: insertId });
  } catch (error) {
    console.log('Failed to insert data');
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to insert data' });
  }
};
