import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../middlewares';
import { querySchema } from '../../schemas';
import { IQueryProps } from '../../interfaces';
import { connector } from '../../database/mysql-connect';





export const createGetAllValidation = validation({
  query: querySchema,
});


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const queryProps = await connector.getUsersWithPagination(req.query);

  res.status(StatusCodes.OK).json(queryProps);
};
