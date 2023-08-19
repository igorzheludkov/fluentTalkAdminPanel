import apiSlice from '../apiSlice'
import { FirebaseDocPayload, IDialogCategory } from '@/types/content'
import { db } from '@/firebase/firebaseConfig'
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'

const collectionName = 'dialogCategories'

export const dialogCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDialogCategories: build.query<FirebaseDocPayload<IDialogCategory>[], void>({
      providesTags: ['dialogs'],
      queryFn: async () => {
        try {
          const data: FirebaseDocPayload<IDialogCategory>[] = []
          const result = await getDocs(collection(db, collectionName))
          result.forEach((item) => {
            data.push({ id: item.id, payload: item.data() as IDialogCategory })
          })
          return { data: data }
        } catch (error: any) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    }),
    addDialogCategory: build.mutation<IDialogCategory, { data: IDialogCategory }>({
      invalidatesTags: ['dialogs'],
      queryFn: async ({ data }, thunkAPI) => {
        console.log('~~~~~~~~~~~~~~ adddoc', data)

        try {
          const result = await addDoc(collection(db, collectionName), {
            ...data
          })
          return { data: data }
        } catch (error: any) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    }),
    editDialogCategory: build.mutation<
      FirebaseDocPayload<IDialogCategory>,
      { data: FirebaseDocPayload<IDialogCategory> }
    >({
      invalidatesTags: ['dialogs'],
      queryFn: async ({ data }, thunkAPI) => {
        console.log('~~~~~~~~~~~~~~ setdoc', data)
        try {
          const result = await setDoc(doc(db, collectionName, data.id), {
            ...data.payload
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

export default dialogCategoriesApi

export const { useAddDialogCategoryMutation, useEditDialogCategoryMutation, useGetDialogCategoriesQuery } =
  dialogCategoriesApi
