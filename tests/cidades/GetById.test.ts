import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {

  it('Get record by id', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Guara', estado:'DF', populacao: 50000 });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer
      .get(`/cidades/id/${res1.body}`)
      .send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty('nome');

  });
  it('Get record that does not exist', async () => {

    const res1 = await testServer
      .get('/cidades/id/595959')
      .send();


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });
});
