import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'yup';


type TProperty = 'body' | 'header' | 'params' | 'query';
type TALLSchemas = Record<TProperty, ObjectSchema<any>>;
type TValidation = (schemas: Partial<TALLSchemas>) => RequestHandler;


export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errors: Record< string, Record<string, string>> = {};
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false});
    } catch (err) {
      const yupError = err as ValidationError;
      const arrayError: Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (!error.path) return;
        arrayError[error.path] = error.message;
      });
      errors[key] = arrayError;
    }
  });
  if (Object.entries(errors).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({errors});
  }

};