import { NextFunction, Request, RequestHandler, Response, query } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParsedUrlQuery } from 'querystring';
import * as yup from 'yup';


import { validation } from '../../shared/middlewares';

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
  console.log(req.params);
  if (Number(req.params.id) === 595959) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Record does not exist'
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};
