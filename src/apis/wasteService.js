import api from './axios'
import { apiHost } from '../envs/env.development'

export default {
    getWasteData: (path = '') => api.get(`api/wastes?page=1&size=1000&sort=createdAt:desc${path}`, { baseURL: apiHost }),
    postWasteData: async (formData) => await api.postData(`/api/wastes`, formData, { baseURL: apiHost }),
}