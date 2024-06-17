import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

let store: any;
export const injectStore = (_store: any) => {
  store = _store;
};

httpRequest.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const headerToken = store?.userInfo?.accessToken ?? "";
    if (headerToken) {
      config.headers.Authorization = `Bearer ${headerToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default httpRequest;
