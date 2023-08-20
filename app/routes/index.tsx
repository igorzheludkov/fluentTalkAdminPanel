import Root from '@/routes/RootLayout/root'
import AuthFormBlock from '@/components/blocks/AuthFormBlock'
import { createBrowserRouter } from 'react-router-dom'
import DialogCategories from '@/components/pages/Dialogs/DialogCategories'
import DialogCategoriesManage from '@/components/pages/Dialogs/DialogCategoriesManage'
import DialogCategoryPage from '@/components/pages/Dialogs/DialogCategoryPage'
import AddDialogSubCategory from '@/components/pages/Dialogs/AddDialogSubCategory'
import DialogSubCategoryPage from '@/components/pages/Dialogs/DialogSubCategoryPage'
import DialogsItems from '@/components/pages/Dialogs/DialogsItems'
import DialogsItemEdit from '@/components/pages/Dialogs/DialogsItemEdit'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'auth',
        element: <AuthFormBlock />
      },
      {
        path: 'dialog-categories',
        element: <DialogCategories />
      },
      {
        path: 'manage-dialog-categories',
        element: <DialogCategoriesManage />
      },
      {
        path: 'dialog-category-page',
        element: <DialogCategoryPage />
      },
      {
        path: 'add-dialog-subcategory',
        element: <AddDialogSubCategory />
      },
      {
        path: 'dialog-subcategory-page',
        element: <DialogSubCategoryPage />
      },
      {
        path: 'dialogs-items',
        element: <DialogsItems />
      },
      {
        path: 'dialogs-item-edit',
        element: <DialogsItemEdit />
      },
    ]
  }
])
