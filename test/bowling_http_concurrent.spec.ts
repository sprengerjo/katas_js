import axios from 'axios';

const randomPort = '' + (1000 + Math.round(Math.random() * 9000));
process.env.PORT = randomPort;
axios.defaults.baseURL = `http://127.0.0.1:${randomPort}`;


describe('test should be run, since the server gets an random port number', () => {
  let server;

  beforeAll(async() => {
    server = await import('../src/bowling_server');
    return server;
  });

  afterAll(async() => {
    return server.close();
  });

  it('retrieve 0 for an empty array of pins', async() => {
    const resp = await axios.post('/scores', {rolls: []});
    expect(resp.data).toEqual(0)
  });

});