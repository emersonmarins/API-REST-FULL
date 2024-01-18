import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'yup';


type TProperty = 'body' | 'header' | 'params' | 'query';
type TALLSchemas = Record<TProperty, ObjectSchema<any>>;
type TValidation = (schemas: Partial<TALLSchemas>) => RequestHandler;




export const validation: TValidation = (schemas) => async (req, res, next) => {
  const isAddress = await req.body.address ? true : false;
  const isCity = await req.body.city ? true : false;
  const isState = await req.body.state ? true : false;
  const isCep = await req.body.cep ? true : false;
  const isPhoneNumber = await req.body.phone_number ? true : false;
  const isPaymentMethod = await req.body.payment_method ? true : false;
  const isCreditCard = await req.body.credit_card ? true : false;
  const isLoyaltyScore = await req.body.loyalty_score ? true : false;
  const isRegistrationAuthorities = await req.body.registration_authorities ? true : false;


  console.log(isAddress);
  const errors: Record<string, Record<string, string>> = {};
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], {
        abortEarly: false,
        context: {
          isAddress: isAddress,
          isCity: isCity,
          isState: isState,
          isCep: isCep,
          isPhoneNumber: isPhoneNumber,
          isPaymentMethod: isPaymentMethod,
          isCreditCard: isCreditCard,
          isLoyaltyScore: isLoyaltyScore,
          isRegistrationAuthorities: isRegistrationAuthorities,
        }
      });
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
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

};