import { DialogPart, DialogSentense } from '@/types/content'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AddEditModal from '@/components/pages/Dialogs/DialogsItemEdit/AddEditModal'
import s from './dialogItemPart.module.css'

interface DialogItemPartProps {
  itemData?: DialogPart
  saveData: (data: DialogPart) => void
}

const DialogItemPart: React.FC<DialogItemPartProps> = ({ itemData, saveData }) => {
  const [showModal, setShowModal] = useState(false)

  const [data, setData] = useState<DialogPart>(
    itemData || {
      id: uuidv4(),
      side: 'ME',
      levelOne: [],
      levelTwo: [],
      levelThree: [],
      createdAt: new Date()
    }
  )

  const handleLevelChange = (newSentence: DialogSentense) => {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        [newSentence.level]: [...prevData[newSentence.level], newSentence]
      }

      saveData(updatedData) // Call saveData with updated data

      return updatedData // Return the updated data to setData
    })
  }

  return (
    <div className={s.dialogPart}>
      <h4 className={s.sideHeader}>{data.side}</h4>
      <button className={s.button} onClick={() => setShowModal(true)}>
        Add New Sentence
      </button>
      {Boolean(data.levelOne.length) && (
        <div className={s.levelContainer}>
          <label className={s.levelLabel}>Level One:</label>
          {data.levelOne.map((item) => (
            <div key={item.id} className={s.sentence}>
              {item.sentense}
            </div>
          ))}
        </div>
      )}
      {Boolean(data.levelTwo?.length) && (
        <div className={s.levelContainer}>
          <label className={s.levelLabel}>Level Two:</label>
          {data.levelTwo?.map((item) => (
            <div key={item.id} className={s.sentence}>
              {item.sentense}
            </div>
          ))}
        </div>
      )}
      {Boolean(data.levelThree?.length) && (
        <div className={s.levelContainer}>
          <label className={s.levelLabel}>Level Three:</label>
          {data.levelThree?.map((item) => (
            <div key={item.id} className={s.sentence}>
              {item.sentense}
            </div>
          ))}
        </div>
      )}
      <br />
      <AddEditModal
        handleLevelChange={handleLevelChange}
        dialogPartId={data.id}
        showModal={showModal}
        modalHandler={setShowModal}
      />
    </div>
  )
}

export default DialogItemPart
