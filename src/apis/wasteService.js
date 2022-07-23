import api from './axios'
import { apiHost } from '../envs/env.development'

export default {
    getWasteData: (path) => api.get(`api/wastes?page=1&size=10&sort=createdAt%3Adesc`, { baseURL: apiHost }),
    postWasteData: async (formData) => await api.postData(`/api/wastes`, formData, { baseURL: apiHost }),
}