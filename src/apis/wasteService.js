import api from './axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com';
import { apiHost } from '../envs/env.development'

export default {
    getWasteData: () => api.get('users', { baseURL: BASE_URL }),
    postWasteData: async (formData) => await api.postData(`/api/wastes`, formData, { baseURL: apiHost }),
}