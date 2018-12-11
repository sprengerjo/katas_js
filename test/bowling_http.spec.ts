import axios from 'axios';
import {always, concat, times} from 'ramda'

const randomPort = '' + (1000 + Math.round(Math.random() * 9000));
process.env.PORT = randomPort;

axios.defaults.baseURL = `http://127.0.0.1:${randomPort}`;

describe('http bowling game calculator', () => {
  let server;

  beforeAll(async () => {
    server = await import('../bin/bowling_server');
    return server;
  });

  afterAll(async () => {
    return server.close();
  });

  it('retrieve 0 for an empty array of pins', async() => {
    const resp = await axios.post('/scores', {rolls: []});
    expect(resp.data).toEqual(0)
  });

  it('retrieve 300 for a perfect game', async() => {
    const rolls = times(always(10), 12);
    const resp = await axios.post('/scores', {rolls: rolls});
    expect(resp.data).toEqual(300)
  });

});