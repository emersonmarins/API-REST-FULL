import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


import { validation } from '../../middlewares';

interface ICidades {
  nome: string,
  estado: string,
  populacao: number
}

export const cidadeValidation: yup.ObjectSchema<ICidades> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(2), 
  populacao: yup.number().required().min(3)
});

export const createValidation = validation({
  body: cidadeValidation,
});

export const create = (req: Request<any, any ,ICidades>, res: Response) => {
  console.log(req.body);
  res.status(StatusCodes.CREATED).json(1);
  console.log('Not implemented');

};
