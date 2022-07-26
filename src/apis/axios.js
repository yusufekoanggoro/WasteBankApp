import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import querystring from "qs";
// import config from "../config/config";

const config = {
  BASE_URL: 'http://localhost:8080'
}

const { BASE_URL } = config;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    Accept: "application/json"
  },
  paramsSerializer: params => querystring.stringify(params)
});

export default {
  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   */
  put: (url, form = null, json = {}) => {
    const token = localStorage.getItem("accessToken");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    // api.defaults.headers.common["Content-Type"] = json ? "application/json" : "application/x-www-form-urlencoded";
    api.defaults.headers["Content-Type"] = json ? "application/json" : "application/x-www-form-urlencoded";
    const data = querystring.stringify(form) || json;
    return api
      .put(url, data, {
        params: querystring.stringify(form),
        baseURL: config.BASE_URL
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} param query params
   */
  get: async (url, customConfig = {}) => {
    console.log(url)
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    return api
      .get(url, {
        ...customConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   * @param {Object} reqConfig  custom config for request
   */
  post: async (url, form = null, json = {}, reqConfig = {}) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    api.defaults.headers["Content-Type"] = form ? "application/x-www-form-urlencoded" : "application/json";
    const data = querystring.stringify(form) || json;
    console.log(data)
    return api
      .post(url, data, {
        params: querystring.stringify(form),
        baseURL: config.BASE_URL,
        ...reqConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },

  /**
   * Send request with Content-Type multipart/form
   * used to upload file
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} data
   */
  postData: async (url, data = {}, customConfig = {}) => {
    const token = await AsyncStorage.getItem("accessToken");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers["Content-Type"] = "multipart/form-data";
    api.defaults.timeout = 30000;
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach(key => {
      data[key] instanceof File ? formData.append(key, data[key], data[key].name) : formData.append(key, data[key]);
    });
    return api
      .post(url, formData, {
        ...customConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },

  postDataMultiple: (url, data = {}, customConfig = {}) => {
		const token = localStorage.getItem("accessToken");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers["Content-Type"] = "multipart/form-data";
    api.defaults.timeout = 30000;
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach(key => {
      data[key] instanceof File ? formData.append(key, data[key], data[key].name) : formData.append(key, data[key]);
      if(Array.isArray(data[key])){
        data[key].forEach((data2, index) => {
          data2 instanceof File ? formData.append(key, data[key][index], data[key][index].name) : formData.append(key, data[key][index]);
        })
      }
    });
    return api
      .post(url, formData, {
        ...customConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
	},

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} params
   * {
   *   id: [1,2,3]
   * }
   */
  delete: (url, params) => {
    const token = localStorage.getItem("accessToken");
    let newUrl = url;
    if (params) {
      const qparam = querystring.stringify(params);
      newUrl = `${newUrl}?${qparam}`;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    return api
      .delete(newUrl, {
        baseURL: config.BASE_URL
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },
  /**
   * Send request with Content-Type multipart/form
   * used to upload file
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} data
   */
  putData: (url, data = {}, customConfig = {}) => {
    const token = localStorage.getItem("accessToken");
    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers["Content-Type"] = "multipart/form-data";
    api.defaults.timeout = 30000;
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach(key => {
      data[key] instanceof File ? formData.append(key, data[key], data[key].name) : formData.append(key, data[key]);
    });
    return api
      .put(url, formData, {
        ...customConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  }
};