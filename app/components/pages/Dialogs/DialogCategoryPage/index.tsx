import { useGetDialogCategoriesQuery } from '@/store/api/dialogs/dialogCategoriesApi'
import s from './index.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useGetDialogSubCategoriesQuery } from '@/store/api/dialogs/dialogSubCategoriesApi'

export default function DialogCategoryPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const paramValue = searchParams.get('id')

  const { data: categories } = useGetDialogCategoriesQuery()
  const { data: subcategories } = useGetDialogSubCategoriesQuery()

  const currentCategory = useMemo(() => {
    return categories?.find((item) => item.id === paramValue)
  }, [categories, paramValue])



  const currentSubCategory = useMemo(() => {
    return subcategories?.filter((item) => item.payload.parent.id === paramValue)
  }, [subcategories, paramValue])

  console.log('~~~~~~~~~~~~~~ currentSubCategory', currentSubCategory)


  return (
    <div className={s.wrapper}>
      <h2>Dialog category page</h2>
      <h3>{currentCategory?.payload.name}</h3>
      <p>{currentCategory?.payload.description}</p>
      <div className={s.linkWrapper}>
        <Link to={`/manage-dialog-categories?id=${paramValue}`}>Edit category</Link>
      </div>
      <br />
      <h2>Subcategories list</h2>
      <div className={s.linkWrapper}>
        <Link to={`/add-dialog-subcategory?id=${paramValue}`}>Add Sub Category</Link>
      </div>
      {currentSubCategory?.map((element) => (
        <div key={element.id} className={s.categoryContainer}>
          <Link to={`/dialog-subcategory-page?id=${paramValue}&idSub=${element.id}`}>
            <h4>{element.payload.name}</h4>
          </Link>
          <p>{element.payload.description}</p>
          <div className={s.linkWrapper}>
            <Link to={`/add-dialog-subcategory?id=${paramValue}&idSub=${element.id}`}>Edit sub category</Link>
          </div>
          <div className={s.separator}></div>
        </div>
      ))}
    </div>
  )
}
