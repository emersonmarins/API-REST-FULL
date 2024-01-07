import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {

  it('Update record by id', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Taguatinga', estado: 'DF', populacao: 50000});


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cidades/id/${res1.body}`)
      .send({nome: 'Guara'});

    expect(resUpdate.statusCode).toEqual(StatusCodes.OK);

  });
  it('Update record that does not exist', async () => {

    const res1 = await testServer
      .put('/cidades/id/595959')
      .send({nome: 'Guará'});


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });
});
