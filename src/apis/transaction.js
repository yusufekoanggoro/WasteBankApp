import api from './axios'
import { apiHost } from '../envs/env.development'

export default {
    postTransaction: async (payload) => await api.post(`/api/transactions`, null, payload, { baseURL: apiHost }),
}