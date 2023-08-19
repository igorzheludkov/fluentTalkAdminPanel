import { Link } from 'react-router-dom'
import s from './index.module.css'
import { useGetDialogCategoriesQuery } from '@/store/api/dialogs/dialogCategoriesApi'

export default function DialogCategories() {
  const { data } = useGetDialogCategoriesQuery()
  return (
    <div className={s.wrapper}>
      <h2>All Dialog Categories</h2>
      <Link to='/manage-dialog-categories/'>Add category</Link>
      {data?.map((element) => (
        <div key={element.id}>
          <h4>{element.payload.name}</h4>
          <p>{element.payload.description}</p>
          <Link to={`/manage-dialog-categories?id=${element.id}`}>Edit category</Link>
        </div>
      ))}
    </div>
  )
}
