import { IRole } from '../types/users'

export const adminRole: IRole = {
  name: 'admin',
  permissions: ['addUser']
}

export const superAdminRole: IRole = {
  name: 'superadmin',
  permissions: ['all']
}

export const userRole: IRole = {
  name: 'user',
  permissions: ['read']
}
