import { NextFunction, Request, RequestHandler, Response, query } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParsedUrlQuery } from 'querystring';
import * as yup from 'yup';


import { validation } from '../../shared/middlewares';

interface IParamsProps {
  id?: number,
}

interface IBodyProps {
  nome: string,
}

export const paramsIdSchema: yup.ObjectSchema<IParamsProps> = yup.object().shape({
  id: yup.number().required().moreThan(0)
});

export const bodySchema: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  nome: yup.string().required().min(3)
});

export const updateByIdValidation = validation({
  params: paramsIdSchema,
  body: bodySchema,
});

export const updateById = (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if (Number(req.params.id) === 595959) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Record does not exist'
      }
    });
  }
  return res.status(StatusCodes.OK).send();
};
