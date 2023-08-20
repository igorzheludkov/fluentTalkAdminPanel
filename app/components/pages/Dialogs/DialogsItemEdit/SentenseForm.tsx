import { DialogSentense, TSides } from '@/types/content'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ELevels } from '@/types/content'

interface IProps {
  saveData: (data: DialogSentense) => void
  dialogPartId: string
  closeModal: () => void
}

export default function SentenceForm({ saveData, dialogPartId, closeModal }: IProps) {
  const levels: ELevels[] = [ELevels.one, ELevels.two, ELevels.three]

  const [form, setForm] = useState({
    id: uuidv4(),
    dialogPartId,
    sentense: '',
    createdAt: new Date(),
    level: ELevels.one
  })

  function handleSave() {
    if (form.sentense) {
      saveData(form)
      closeModal()
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, level: event.target.value as ELevels })
  }

  return (
    <div>
      <h2>Add new sentense</h2>

      <h4>Select dialog level</h4>
      <select value={form.level} onChange={handleSelectChange}>
        {levels.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <h4>Type in sentense</h4>

      <input
        type='text'
        name='sentense'
        value={form.sentense}
        onChange={(e) => setForm({ ...form, sentense: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
