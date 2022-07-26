import api from './axios'
import { apiHost } from '../envs/env.development'

export default {
    getReport: (path) => api.get(`api/transactions?${path}`, { baseURL: apiHost }),
    getDownloadReport: (path) => api.get(`api/transactions/exports?${path}`, { baseURL: apiHost })
}