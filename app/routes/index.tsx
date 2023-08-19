import Root from '@/routes/RootLayout/root'
import AuthFormBlock from '@/components/blocks/AuthFormBlock'
import { createBrowserRouter } from 'react-router-dom'
import DialogCategories from '@/components/pages/DialogCategories'
import DialogCategoriesManage from '@/components/pages/DialogCategoriesManage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'auth/',
        element: <AuthFormBlock />
      },
      {
        path: 'dialog-categories/',
        element: <DialogCategories />
      },
      {
        path: 'manage-dialog-categories/',
        element: <DialogCategoriesManage />
      },
    ]
  }
])
