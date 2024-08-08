'use client'

import { useRef, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { ProjectData } from '.'
import { createClient } from '@/lib/supabase/client'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  selectedItem: ProjectData | undefined
  onSave: (projectData: ProjectData) => void
  modalType: 'add' | 'edit'
}

export default function ProjectEditModal(props: Props) {
  const { isOpen, onOpenChange, selectedItem, onSave, modalType } = props

  const nameRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState(selectedItem?.projectName ?? '')
  const [description, setDescription] = useState(selectedItem?.description ?? '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name === '') {
      nameRef.current?.focus()
    }
    if (description === '') {
      descriptionRef.current?.focus()
    }

    const supabase = createClient()

    let response = null
    if (modalType === 'add') {
      response = await supabase
        .from('project')
        .insert({
          projectName: name,
          description
        })
        .select()
    } else {
      response = await supabase
        .from('project')
        .update({ projectName: name, description })
        .eq('id', selectedItem!.id)
        .select()
    }

    if (response.error) {
      alert('Error')
      return
    }

    onSave(response.data[0])
    onOpenChange()
  }

  const handleKeyDownsubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      console.log(123)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDownsubmit} autoComplete='false'>
              <ModalHeader className='flex flex-col gap-1'>Edit Project</ModalHeader>
              <ModalBody>
                <Input
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label='Project Name'
                  placeholder='Enter your project name'
                  variant='bordered'
                  color='primary'
                />
                <Input
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label='Description'
                  placeholder='Enter your description'
                  variant='bordered'
                  color='primary'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' type='submit'>
                  Save
                </Button>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
