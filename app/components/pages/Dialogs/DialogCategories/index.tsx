import { Link } from 'react-router-dom'
import s from './index.module.css'
import { useGetDialogCategoriesQuery } from '@/store/api/dialogs/dialogCategoriesApi'

export default function DialogCategories() {
  const { data } = useGetDialogCategoriesQuery()
  return (
    <div className={s.wrapper}>
      <h2>All Dialog Categories</h2>
      <div className={s.linkWrapper}>
        <Link to='/manage-dialog-categories/'>Add category</Link>
      </div>
      {data?.map((element) => (
        <div key={element.id} className={s.categoryContainer}>
          <Link to={`/dialog-category-page?id=${element.id}`}>
            <h4>{element.payload.name}</h4>
          </Link>
          <p>{element.payload.description}</p>
          <div className={s.linkWrapper}>
            <Link to={`/manage-dialog-categories?id=${element.id}`}>Edit category</Link>
          </div>
          <div className={s.separator}></div>
        </div>
      ))}
    </div>
  )
}
