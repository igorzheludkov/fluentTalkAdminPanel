export type TPermissions = 'addAdmin' | 'addUser' | 'createPost' | 'read' | 'update' | 'delete' | 'all'

export interface IRole {
  name: 'user' | 'admin' | 'superadmin'
  permissions: TPermissions[] // An array of permission identifiers
}

export interface IUser {
  id: string
  displayName: string
  email: string
  role: IRole
}
