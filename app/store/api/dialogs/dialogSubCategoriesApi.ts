import apiSlice from '../apiSlice'
import { FirebaseDocPayload, IDialogSubCategory, SubCategoryPayload } from '@/types/content'
import { db } from '@/firebase/firebaseConfig'
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'

const parentCollectionName = 'dialogCategories'
const collectionName = 'dialogSubCategories'

export const dialogSubCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDialogSubCategories: build.query<FirebaseDocPayload<IDialogSubCategory>[], void>({
      providesTags: ['dialogsSub'],
      queryFn: async () => {
        try {
          const data: FirebaseDocPayload<IDialogSubCategory>[] = []
          const result = await getDocs(collection(db, collectionName))
          result.forEach((item) => {
            data.push({ id: item.id, payload: item.data() as IDialogSubCategory })
          })
          return { data: data }
        } catch (error: any) {
          const errorCode = error.code
          const errorMessage = error.message
          return { error: { data: errorMessage, status: errorCode } }
        }
      }
    }),
    addDialogSubCategory: build.mutation<
      SubCategoryPayload<IDialogSubCategory>,
      { data: SubCategoryPayload<IDialogSubCategory> }
    >({
      invalidatesTags: ['dialogsSub'],
      queryFn: async ({ data }, thunkAPI) => {
        console.log('~~~~~~~~~~~~~~ adddoc', data)
        const parentCategoryRef = doc(db, parentCollectionName, data.parent)

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
    editDialogSubCategory: build.mutation<
      SubCategoryPayload<IDialogSubCategory>,
      { data: SubCategoryPayload<IDialogSubCategory> }
    >({
      invalidatesTags: ['dialogsSub'],
      queryFn: async ({ data }, thunkAPI) => {
        const parentCategoryRef = doc(db, parentCollectionName, data.parent)

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

export default dialogSubCategoriesApi

export const {
  useAddDialogSubCategoryMutation,
  useEditDialogSubCategoryMutation,
  useGetDialogSubCategoriesQuery
} = dialogSubCategoriesApi
