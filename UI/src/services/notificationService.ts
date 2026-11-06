import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
export const notificationService = { list: () => api(E.notifications.list) };
