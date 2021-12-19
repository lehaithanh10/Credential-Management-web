import axios from 'axios';
const tokenJWT = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYWl0aGFuaCIsImlhdCI6MTYzOTgzMjkxMSwiZXhwIjoxNjM5OTE5MzExfQ.LPFkfhhffiRlKYV0dyz4CPvmnidoMrkkOSR4SAwtjVnZkymIM1zMezdQ3UPb2xY0whR7vE51C1BPgDKKpCadKg'
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});
instance.interceptors.request.use(
  function (config) {
    const token = `Bearer ${tokenJWT}`;
    if (token) {
      config.headers.Authorization = token;
    }
    console.log('config', config);
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
