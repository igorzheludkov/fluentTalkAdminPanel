import apiSlice from '../apiSlice'
import { DialogFull, FirebaseDocPayload, DialogItemPayload } from '@/types/content'
import { db } from '@/firebase/firebaseConfig'
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'

const subCollectionName = 'dialogSubCategories'
const collectionName = 'dialogItems'

export const dialogItemsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDialogItems: build.query<FirebaseDocPayload<DialogFull>[], void>({
      providesTags: ['dialogItems'],
      queryFn: async () => {
        try {
          const data: FirebaseDocPayload<DialogFull>[] = []
          const result = await getDocs(collection(db, collectionName))
          result.forEach((item) => {
            data.push({ id: item.id, payload: item.data() as DialogFull })
          })
          return { data: data }
        } catch (error: any) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    }),
    addDialogItem: build.mutation<DialogItemPayload<DialogFull>, { data: DialogItemPayload<DialogFull> }>({
      invalidatesTags: ['dialogItems'],
      queryFn: async ({ data }, thunkAPI) => {
        console.log('~~~~~~~~~~~~~~ adddoc', data)
        const parentCategoryRef = doc(db, subCollectionName, data.parent)

        try {
          const result = await addDoc(collection(db, collectionName), {
            ...data.payload,
            parent: parentCategoryRef
          })
          return { data: data }
        } catch (error: any) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    }),
    editDialogItem: build.mutation<DialogItemPayload<DialogFull>, { data: DialogItemPayload<DialogFull> }>({
      invalidatesTags: ['dialogItems'],
      queryFn: async ({ data }, thunkAPI) => {
        const parentCategoryRef = doc(db, subCollectionName, data.parent)

        console.log('~~~~~~~~~~~~~~ setdoc', data)
        try {
          const result = await setDoc(doc(db, collectionName, data.id), {
            ...data.payload,
            parent: parentCategoryRef
          })
          return { data: data }
        } catch (error: any) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    })
  }),
  overrideExisting: false
})

export default dialogItemsApi

export const { useAddDialogItemMutation, useEditDialogItemMutation, useGetDialogItemsQuery } = dialogItemsApi
