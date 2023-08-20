import {
  useAddDialogCategoryMutation,
  useEditDialogCategoryMutation,
  useGetDialogCategoriesQuery
} from '@/store/api/dialogs/dialogCategoriesApi'
import s from './index.module.css'
import { useEffect, useMemo, useState } from 'react'
import { IDialogCategory } from '@/types/content'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DialogCategoriesManage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [addCategory, addState] = useAddDialogCategoryMutation()
  const [editCategory, editState] = useEditDialogCategoryMutation()
  const { data: categories } = useGetDialogCategoriesQuery()

  const searchParams = new URLSearchParams(location.search)
  const paramValue = searchParams.get('id')

  const editItem = useMemo(() => {
    return categories?.find((item) => item.id === paramValue)
  }, [categories, paramValue])

  const [data, setData] = useState<IDialogCategory>(
    editItem?.payload || {
      id: uuidv4(),
      name: '',
      description: '',
      createdAt: new Date()
    }
  )

  useEffect(() => {
    if (addState.isSuccess || editState.isSuccess) {
      navigate('/dialog-categories')
    }
  }, [addState.isSuccess, editState.isSuccess, navigate])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleSend() {
    paramValue ? editCategory({ data: { id: paramValue, payload: data } }) : addCategory({ data })
  }

  return (
    <div className={s.wrapper}>
      <h2>Enter category name and description</h2>
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
        {paramValue ? 'Edit' : 'Add'} category
      </button>
    </div>
  )
}
