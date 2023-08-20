import Modal from 'react-modal'
import SentenceForm from '@/components/pages/Dialogs/DialogsItemEdit/SentenseForm'

interface IProps {
  handleLevelChange: (data: any) => void
  dialogPartId: string
  showModal: boolean
  modalHandler: (arg0: boolean) => void
}

export default function AddEditModal(props: IProps) {
  const { handleLevelChange, showModal, dialogPartId, modalHandler } = props

  return (
    <Modal isOpen={showModal} onRequestClose={() => modalHandler(false)} contentLabel='Add New Sentence'>
      <SentenceForm
        saveData={(data) => handleLevelChange(data)}
        dialogPartId={dialogPartId}
        closeModal={() => modalHandler(false)}
      />
      <button onClick={() => modalHandler(false)}>Close</button>
    </Modal>
  )
}
