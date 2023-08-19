import appSlice from '@/store/app/appSlice'
import userSlice from '@/store/user/userSlice'
import apiSlice from '@/store/api/apiSlice'

export default {
  app: appSlice,
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
}
