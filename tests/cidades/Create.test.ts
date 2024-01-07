import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {

  it('Cria registro', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Guara', estado: 'São Paulo', populacao: 50000 });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('test name lenght', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nofme: 'Guara', estado: 'São Paulo', populacfao: 50000 });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');

  });
});
