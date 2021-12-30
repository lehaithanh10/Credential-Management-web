import axios from 'axios';
const tokenJWT =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYWl0aGFuaCIsImlhdCI6MTY0MDY0ODQ0MCwiZXhwIjoxNjQwNzM0ODQwfQ.NXO4wAFkZLrxPJgXkpcD1_diqcr9AbEK089vPQExRRlmZ2S_a5lVdyCDhZwncicNElfxGIjVBwwQYVeDuT0hFg';
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});
instance.interceptors.request.use(
  function (config) {
    console.log()
    const token = `Bearer ${tokenJWT}`;
    if (token) {
      config.headers = {
        Authorization: token,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
