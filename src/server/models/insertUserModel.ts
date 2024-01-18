
import { RequestHandler } from 'express';
import moment from 'moment-timezone';
const formatted_data =  moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');


export const userResgistrate: RequestHandler = (req) => {
  return {
    name: req.body.name.trim(),
    last_name: req.body.last_name.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim(),
    address: req.body.address.trim(),
    city: req.body.city.trim(),
    state: req.body.state.trim(),
    cep: req.body.cep.trim(),
    phone_number: req.body.phone_number.trim(),
    payment_method: req.body.payment_method.trim(),
    credit_card: req.body.credit_card.trim(),
    purchase_history: req.body.purchase_history,
    wish: req.body.wish,
    shopping_cart: req.body.shopping_cart,
    reviews: req.body.reviews,
    loyalty_score: 1000,
    registration_authorities: req.body.registration_authorities.trim(),
    user_type: 'client',
    account_status: 'active',
    profile_photo: req.body.profile_photo.trim(),
    preferred_language: req.body.preferred_language === '' || req.body.preferred_language === undefined ? 'portugues' : req.body.preferred_language,
    gender: req.body.gender,
    nasc: req.body.nasc ? req.body.nasc.trim() : req.body.nasc,
    interests: req.body.interests,
    data_record: formatted_data,
    data_last_activity: formatted_data,
  };
};