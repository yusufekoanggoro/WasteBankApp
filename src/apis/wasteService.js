import api from './axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default {
    getWasteData: () => api.get('users', { baseURL: BASE_URL }),
}