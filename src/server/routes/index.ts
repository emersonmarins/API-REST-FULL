import { Router } from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController, TestController, UserController } from './../controller';

const router = Router();



router.get('/', (req: Request, res: Response) => {
  res.send('<h1>hello World!</h1>');
});

// USER
router.post('/user', UserController.createValidation, UserController.create);
router.get('/user', UserController.createGetAllValidation, UserController.getAll);
router.put('/user/:id', UserController.updateByIdValidation, UserController.updateById);
router.delete('/user/:id', UserController.deleteByIdValidation, UserController.deleteById);
router.get('/user/:id', UserController.getByIdValidation, UserController.getById);


// CITY
router.get('/cidades/id/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/id/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/id/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);
router.get('/cidades', CidadesController.createGetAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
// router.get('/test01', TestController.CreateTest01);

export {router};