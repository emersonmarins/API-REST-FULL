import * as yup from 'yup';
import { IQueryProps } from '../interfaces';

export const querySchema: yup.ObjectSchema<IQueryProps> = yup.object().shape({
  page: yup.number().integer().optional().moreThan(0),
  limit: yup.number().integer().optional().moreThan(0),
  filter: yup.string().optional()
});