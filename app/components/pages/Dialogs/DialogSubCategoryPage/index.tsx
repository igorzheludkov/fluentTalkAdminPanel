import s from './index.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useGetDialogSubCategoriesQuery } from '@/store/api/dialogs/dialogSubCategoriesApi'
import { useGetDialogItemsQuery } from '@/store/api/dialogs/dialogItemsApi'

export default function DialogSubCategoryPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const catId = searchParams.get('id')
  const subCatId = searchParams.get('idSub')

  const { data: subcategories } = useGetDialogSubCategoriesQuery()
  const { data: dialogItems } = useGetDialogItemsQuery()

  const currentSubCategory = useMemo(() => {
    return subcategories?.find((item) => item.id === subCatId)
  }, [subcategories, subCatId])

  const currentDialogItems = useMemo(() => {
    return dialogItems?.filter((item) => item.payload.parent.id === subCatId)
  }, [dialogItems, subCatId])

  console.log('~~~~~~~~~~~~~~ currentDialogItems', currentDialogItems)
  return (
    <div className={s.wrapper}>
      <h2>Dialog subcategory page</h2>
      <h3>{currentSubCategory?.payload.name}</h3>
      <p>{currentSubCategory?.payload.description}</p>
      <div className={s.linkWrapper}>
        <Link to={`/add-dialog-subcategory?id=${catId}&idSub=${subCatId}`}>Edit sub category</Link>
      </div>
      <br />
      <h2>Dialogs list</h2>
      <div className={s.linkWrapper}>
        <Link to={`/dialogs-item-edit?id=${catId}&idSub=${subCatId}`}>Add dialog item</Link>
      </div>
      {currentDialogItems?.map((element) => (
        <div key={element.id} className={s.categoryContainer}>
          <h4>{element.payload.title}</h4>
          <p>{element.payload.description}</p>
          <div className={s.linkWrapper}>
            <Link to={`/dialogs-item-edit?id=${catId}&idSub=${subCatId}&idDialog=${element.id}`}>
              Edit dialog item
            </Link>
          </div>
          <div className={s.separator}></div>
        </div>
      ))}
    </div>
  )
}
