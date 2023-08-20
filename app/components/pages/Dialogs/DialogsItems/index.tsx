import s from './index.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useGetDialogSubCategoriesQuery } from '@/store/api/dialogs/dialogSubCategoriesApi'

export default function DialogsItems() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const catId = searchParams.get('id')
  const subCatId = searchParams.get('idSub')

  const { data: subcategories } = useGetDialogSubCategoriesQuery()

  const currentSubCategory = useMemo(() => {
    return subcategories?.find((item) => item.id === subCatId)
  }, [subcategories, subCatId])

  console.log('~~~~~~~~~~~~~~ subcats', currentSubCategory)
  return (
    <div className={s.wrapper}>
      <h2>Dialogs items page</h2>
      <h3>{currentSubCategory?.payload.name} - dialogs list</h3>
      <p>{currentSubCategory?.payload.description}</p>
      <Link to={`/add-dialog-subcategory?id=${catId}&idSub=${subCatId}`}>Edit sub category</Link>
      <br></br>
      {/* {subcategories?.map((element) => (
        <div key={element.id}>
          <h4>{element.payload.name}</h4>
          <p>{element.payload.description}</p>
          <Link to={`/dialog-items-edit?id=${paramValue}&idSub=${element.id}`}>
            Edit sub category
          </Link>
          <p>------------------------</p>
        </div>
      ))} */}
    </div>
  )
}
