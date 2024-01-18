import { NextFunction, Request, RequestHandler, Response, query } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParsedUrlQuery } from 'querystring';
import * as yup from 'yup';


import { validation } from '../../middlewares';

interface IQueryProps {
  page?: number,
  limit?: number,
  filter?: string
}

export const querySchema: yup.ObjectSchema<IQueryProps> = yup.object().shape({
  page: yup.number().integer().optional().moreThan(0),
  limit: yup.number().integer().optional().moreThan(0),
  filter: yup.string().optional()
});

export const createGetAllValidation = validation({
  query: querySchema,
});


export const getAll = (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);


  res.status(StatusCodes.OK).json([{
    id: 1,
    nome: 'Taguatinga'
  }]);
};
