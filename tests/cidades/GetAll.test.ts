import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {

  it('Get ALL Records', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Taguatinga', estado: 'DF', populacao: 500000 });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resGetAllRecord = await testServer
      .get('/cidades')
      .send();

    expect(Number(resGetAllRecord.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAllRecord.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAllRecord.body.length).toBeGreaterThan(0);

  });
});
