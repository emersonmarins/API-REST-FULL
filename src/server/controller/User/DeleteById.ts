import { NextFunction, Request, RequestHandler, Response, query } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParsedUrlQuery } from 'querystring';
import * as yup from 'yup';


import { validation } from '../../middlewares';
import { connector } from '../../database/mysql-connect';

interface IParamsProps {
  id?: number,

}

export const paramsIdSchema: yup.ObjectSchema<IParamsProps> = yup.object().shape({
  id: yup.number().optional().moreThan(0)
});

export const deleteByIdValidation = validation({
  params: paramsIdSchema,
});

export const deleteById = (req: Request<IParamsProps>, res: Response) => {
  connector.deleteUser(req.params.id);

  return res.status(StatusCodes.NO_CONTENT).send();
};
