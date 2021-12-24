import axios from 'axios';
const tokenJWT =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYWl0aGFuaCIsImlhdCI6MTY0MDI3MTA1MywiZXhwIjoxNjQwMzU3NDUzfQ.R7VAo7dCBBThq5spU3pR1iZl68jhqZnKmGeTjmJLtYsnTT3Oh-ZsZxgisHac7dzOaSX3L7DA6hruYErsQYu2eQ';
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
