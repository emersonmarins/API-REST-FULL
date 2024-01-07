import { Router } from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController, TestController } from './../controller';

const router = Router();



router.get('/', (req: Request, res: Response) => {
  res.send('<h1>hello World!</h1>');
});

router.get('/cidades/id/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/id/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/id/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);
router.get('/cidades', CidadesController.createGetAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
// router.get('/test01', TestController.CreateTest01);

export {router};