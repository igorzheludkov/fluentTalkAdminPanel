export type TSides = 'ME' | 'COMPANION' | 'THIRD_PERSON' | 'FOURTH_PERSON' | 'FIFTH_PERSON'

export enum ESides {
  ME = 'ME',
  COMPANION = 'COMPANION',
  THIRD_PERSON = 'THIRD_PERSON'
}

export enum ELevels {
  one = 'levelOne',
  two = 'levelTwo',
  three = 'levelThree'
}

export interface DialogPart {
  id: string
  side: TSides
  levelOne: DialogSentense[]
  levelTwo?: DialogSentense[]
  levelThree?: DialogSentense[]
  createdAt: Date
}

export interface DialogSentense {
  id: string
  dialogPartId: string
  sentense: string
  createdAt: Date
  level: ELevels
}

export interface DialogFull {
  id: string
  title: string
  description: string
  dialogParts: DialogPart[]
  parent: {
    id: string
    path: string
  }
}

export interface IDialog {
  id: string
  title: string
  description: string
  content: DialogPart[]
}

export interface Bookmark {
  userId: string // User who bookmarked the content
  contentId: string // ID of the bookmarked content
  createdAt: string
}

export interface IDialogCategory {
  id: string
  name: string
  description?: string
  createdAt: Date
}
export interface IDialogSubCategory {
  id: string
  name: string
  description?: string
  createdAt: Date
  parent: {
    id: string
    path: string
  }
}

export interface FirebaseDocPayload<T> {
  id: string
  payload: T
}
export interface SubCategoryPayload<T> {
  parent: string
  id: string
  payload: T
}
export interface DialogItemPayload<T> {
  parent: string
  id: string
  payload: T
}
