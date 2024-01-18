export interface IUser {
  name: string,
  last_name: string,
  email: string,
  password: string,
  address?: string,
  city?: string,
  state?: string,
  cep?: string,
  phone_number?: string,
  payment_method?: string,
  credit_card?: string,
  purchase_history?: object,
  wish?: object,
  shopping_cart?: object,
  reviews?: object,
  loyalty_score?: number,
  registration_authorities?: string,
  user_type?: string,
  account_status?: string,
  profile_photo?: string,
  preferred_language?: string,
  gender?: object,
  nasc?: Date | undefined | null,
  interests?: object | string | any,
  data_record?: string,
  data_last_activity?: string,
}