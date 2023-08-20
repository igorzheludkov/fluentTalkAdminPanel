import s from './index.module.css'
import { useEffect, useMemo, useState } from 'react'
import { DialogFull, DialogPart, ESides } from '@/types/content'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  useAddDialogItemMutation,
  useEditDialogItemMutation,
  useGetDialogItemsQuery
} from '@/store/api/dialogs/dialogItemsApi'
import DialogItemPart from '@/components/pages/Dialogs/DialogsItemEdit/DialogItemPart'

export default function DialogsItemEdit() {
  const sides: ESides[] = [ESides.ME, ESides.COMPANION, ESides.THIRD_PERSON]

  const navigate = useNavigate()
  const location = useLocation()
  const [addDialogItem, addState] = useAddDialogItemMutation()
  const [editDialogItem, editState] = useEditDialogItemMutation()
  const { data: dialogItems } = useGetDialogItemsQuery()

  const searchParams = new URLSearchParams(location.search)
  const catId = searchParams.get('id')
  const subCatId = searchParams.get('idSub')
  const dialogId = searchParams.get('idDialog')

  const editItem = useMemo(() => {
    return dialogItems?.find((item) => item.id === dialogId)
  }, [dialogItems, dialogId])

  const [selectedSide, setSelectedSide] = useState(ESides.ME)
  const [fullDialog, setFullDialog] = useState<DialogFull>(
    editItem?.payload || {
      id: uuidv4(),
      title: '',
      description: '',
      dialogParts: []
    }
  )

  const newPart = {
    id: uuidv4(),
    side: selectedSide,
    levelOne: [],
    levelTwo: [],
    levelThree: [],
    createdAt: new Date()
  }

  console.log('~~~~~~~~~~~~~~ fullDialog', fullDialog.dialogParts)

  function handleSend() {
    if (catId && subCatId) {
      dialogId
        ? editDialogItem({ data: { id: dialogId, payload: fullDialog, parent: subCatId } })
        : addDialogItem({ data: { id: '', payload: fullDialog, parent: subCatId } })
    }
  }

  function addNewDialogPart() {
    setFullDialog((prevFullDialog) => ({
      ...prevFullDialog,
      dialogParts: [...prevFullDialog.dialogParts, newPart]
    }))
  }

  function handleDialogPart(updatedPart: DialogPart) {
    setFullDialog((prevFullDialog) => ({
      ...prevFullDialog,
      dialogParts: prevFullDialog.dialogParts.map((part) => (part.id === updatedPart.id ? updatedPart : part))
    }))
  }

  function handleSelectSide(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSide = event.target.value as ESides
    setSelectedSide(selectedSide)
  }

  useEffect(() => {
    if (addState.isSuccess || editState.isSuccess) {
      navigate(`/dialog-subcategory-page?id=${catId}&idSub=${subCatId}`)
    }
  }, [addState.isSuccess, editState.isSuccess, catId, subCatId, navigate])

  return (
    <div className={s.wrapper}>
      <h2>Add or edit dialog item</h2>
      <h4>Dialog name</h4>
      <input
        type='text'
        placeholder='Dialog name'
        name='name'
        value={fullDialog.title}
        onChange={(e) => setFullDialog({ ...fullDialog, title: e.target.value })}
        className={s.input}
      />
      <h4>Dialog description</h4>
      <input
        type='text'
        placeholder='Dialog description'
        name='description'
        value={fullDialog.description}
        onChange={(e) => setFullDialog({ ...fullDialog, description: e.target.value })}
        className={s.input}
      />

      {fullDialog.dialogParts?.length
        ? fullDialog.dialogParts.map((part) => (
            <DialogItemPart key={part.id} saveData={handleDialogPart} itemData={part} />
          ))
        : null}
      <h4>Add dialog part dialog</h4>
      <h4>Select dialog side</h4>
      <select value={selectedSide} onChange={handleSelectSide} className={s.select}>
        {sides.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={addNewDialogPart} className={s.button}>
        Add new part
      </button>
      <h4>Add or edit dialog</h4>
      <button onClick={handleSend} className={s.button}>
        {subCatId ? 'Save' : 'Add'} dialog
      </button>
    </div>
  )
}
