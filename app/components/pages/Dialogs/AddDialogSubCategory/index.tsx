import s from './index.module.css'
import { useEffect, useMemo, useState } from 'react'
import { IDialogSubCategory } from '@/types/content'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useAddDialogSubCategoryMutation,
  useEditDialogSubCategoryMutation,
  useGetDialogSubCategoriesQuery
} from '@/store/api/dialogs/dialogSubCategoriesApi'

export default function AddDialogSubCategory() {
  const navigate = useNavigate()
  const location = useLocation()
  const [addSubCategory, addState] = useAddDialogSubCategoryMutation()
  const [editSubCategory, editState] = useEditDialogSubCategoryMutation()
  const { data: categories } = useGetDialogSubCategoriesQuery()

  const searchParams = new URLSearchParams(location.search)
  const catId = searchParams.get('id')
  const subCatId = searchParams.get('idSub')

  console.log('~~~~~~~~~~~~~~ catId', catId)
  console.log('~~~~~~~~~~~~~~ subcat', subCatId)

  const editItem = useMemo(() => {
    return categories?.find((item) => item.id === subCatId)
  }, [categories, subCatId])

  const [data, setData] = useState<IDialogSubCategory>(
    editItem?.payload || {
      id: uuidv4(),
      name: '',
      description: '',
      createdAt: new Date()
    }
  )

  console.log('~~~~~~~~~~~~~~ data', data)

  useEffect(() => {
    if (addState.isSuccess || editState.isSuccess) {
      navigate(`/dialog-category-page?id=${catId}`)
    }
  }, [addState.isSuccess, editState.isSuccess, catId, navigate])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleSend() {
    if (catId) {
      subCatId
        ? editSubCategory({ data: { id: subCatId, payload: data, parent: catId } })
        : addSubCategory({ data: { id: '', payload: data, parent: catId } })
    }
  }

  return (
    <div className={s.wrapper}>
      <h2>Enter subcategory name and description</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={data.name}
        onChange={handleChange}
        className={s.input}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={data.description}
        onChange={handleChange}
        className={s.input}
      />
      <button onClick={handleSend} className={s.button}>
        {subCatId ? 'Edit' : 'Add'} sub category
      </button>
    </div>
  )
}
