import * as yup from 'yup';
import { IUser } from '../interfaces';

export const updateUserValidation: yup.ObjectSchema<IUser> = yup.object().shape({
  name: yup.string().required().default('defaultName').min(3),
  last_name: yup.string().required().default('default last name').min(3),
  email: yup.string().required().default('default@gmail.com').email(),
  password: yup.string().required().default('default').min(4).max(20),
  address: yup.string().when('$isAddress', {
    is: true,
    then: (address) => address.optional().min(4),
    otherwise: (address) => address.optional(),
  }),
  city: yup.string().when('$isCity', {
    is: true,
    then: (city) => city.optional().min(4),
    otherwise: (city) => city.optional(),
  }),
  state: yup.string().when('$isState', {
    is: true,
    then: (state) => state.optional().min(4),
    otherwise: (state) => state.optional(),
  }),
  cep: yup.string().when('$isCep', {
    is: true,
    then: (cep) => cep.optional().min(4),
    otherwise: (cep) => cep.optional(),
  }),
  phone_number: yup.string().when('$isPhoneNumber', {
    is: true,
    then: (phone_number) => phone_number.optional().min(11).max(15),
    otherwise: (phone_number) => phone_number.optional(),
  }),
  payment_method: yup.string().when('$isPaymentMethod', {
    is: true,
    then: (payment_method) => payment_method.optional().min(4),
    otherwise: (payment_method) => payment_method.optional(),
  }),
  credit_card: yup.string().when('$isCreditCard', {
    is: true,
    then: (credit_card) => credit_card.optional().min(4),
    otherwise: (credit_card) => credit_card.optional(),
  }),
  purchase_history: yup.object().optional(),
  wish: yup.object().optional(),
  shopping_cart: yup.object().optional(),
  reviews: yup.object().optional(),
  loyalty_score: yup.number().when('$isLoyaltyScore', {
    is: true,
    then: (loyalty_score) => loyalty_score.optional().min(1),
    otherwise: (loyalty_score) => loyalty_score.optional(),
  }),
  registration_authorities: yup.string().when('$isRegistrationAuthorities', {
    is: true,
    then: (registration_authorities) => registration_authorities.optional().min(4),
    otherwise: (registration_authorities) => registration_authorities.optional(),
  }),
  user_type: yup.string().optional(),
  account_status: yup.string().optional(),
  profile_photo: yup.string().optional(),
  preferred_language: yup.string().optional(),
  gender: yup.object().optional(),
  nasc: yup.date().nullable().optional(),
  interests: yup.object().optional(),
  data_record: yup.string().optional(),
  data_last_activity: yup.string().optional(),

});