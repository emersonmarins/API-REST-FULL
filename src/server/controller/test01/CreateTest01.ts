import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


import { validation } from '../../shared/middlewares';

interface Ttest01 {
  name: string,
  email: string,
  age: number
}

const validationTest01Yup: yup.ObjectSchema<Ttest01> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  age: yup.number().required().transform((value) => {
    return value = Number(value);
  })
});


const middleware01: RequestHandler = async (req, res, next) => {

  try {
    await validationTest01Yup.validate(req.body, { strict: true });
    console.log('middleware01 ');
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.send(error);

  }
};
const middleware02: RequestHandler = (req, res, next) => {
  console.log('middleware02');
  console.log(req.body);
  next();
};
const middleware03: RequestHandler = (req, res, next) => {
  console.log('middleware03');
  console.log(req.body);
  res.send(req.body);
  next();
};
export const CreateTest01: RequestHandler = (req, res, next) => {
  middleware01(req, res, next),
  middleware02(req, res, next),
  middleware03(req, res, next);
};