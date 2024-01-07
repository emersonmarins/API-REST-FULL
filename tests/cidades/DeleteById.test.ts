import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {

  it('Delete record', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Guara', estado:'DF', populacao: 50000 });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/cidades/id/${res1.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });
  it('Delete record that does not exist', async () => {

    const res1 = await testServer
      .delete('/cidades/id/595959')
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });
});
