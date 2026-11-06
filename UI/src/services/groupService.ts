import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
import { Group } from '../types/group';
export const groupService = {
  list: () => api<Group[]>(E.groups.list),
  create: (name: string) => api<Group>(E.groups.create, { body: { name } }),
  join: (code: string) => api<Group>(E.groups.join, { body: { code } }),
  members: (id: string) => api(E.groups.members + `?group_id=${id}`),
};
