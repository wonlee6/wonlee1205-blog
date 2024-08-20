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
import { ProjectData } from '@/model/web-builder'
import { sleep } from '@/lib/utils'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  selectedItem: ProjectData | undefined
  onSave: (projectData: ProjectData) => void
  onDelete: (id: string) => void
  modalType: 'add' | 'edit'
  userId: string
}

export default function ProjectEditModal(props: Props) {
  const { isOpen, onOpenChange, selectedItem, onSave, onDelete, modalType, userId } = props

  const nameRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState(modalType === 'add' ? '' : selectedItem!.projectName)
  const [description, setDescription] = useState(
    modalType === 'add' ? '' : selectedItem!.description
  )

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name === '') {
      nameRef.current?.focus()
    }
    if (description === '') {
      descriptionRef.current?.focus()
    }

    if (!selectedItem) return

    let data = null
    let errorMsg = ''

    try {
      if (modalType === 'add') {
        const response = await fetch('/api/web-builder/project', {
          method: 'POST',
          body: JSON.stringify({ projectName: name, description, user_id: userId, type: 'add' })
        })
        errorMsg = response.statusText
        data = await response.json()
      } else {
        const response = await fetch('/api/web-builder/project', {
          method: 'POST',
          body: JSON.stringify({
            id: selectedItem!.id,
            projectName: name,
            description,
            user_id: userId,
            type: 'update'
          })
        })
        errorMsg = response.statusText
        data = await response.json()
      }
    } catch (error) {
      alert(errorMsg)
      return
    }

    onSave(data)
    onOpenChange()
  }

  const handleDeleteProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!selectedItem) return

    setIsLoading(true)

    const response = await fetch('/api/web-builder/project', {
      method: 'DELETE',
      body: JSON.stringify({
        id: selectedItem.id
      })
    })

    if (!response.ok) {
      alert(response.statusText)
      return
    }

    await sleep(1000)
    setIsLoading(false)

    onOpenChange()
    onDelete(selectedItem.id)
  }

  const handleKeyDownSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDownSubmit} autoComplete='off'>
              <ModalHeader className='flex flex-col gap-1'>
                {modalType === 'add' ? (
                  <h2>Add Project</h2>
                ) : (
                  <>
                    <h2>Edit Project</h2>
                    <p className='flex gap-2 text-sm text-foreground-400'>
                      Create Date:
                      <span className='underline'>
                        {new Date(selectedItem?.created_at!).toLocaleString()}
                      </span>
                    </p>
                  </>
                )}
              </ModalHeader>
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
                {modalType === 'edit' && (
                  <Button
                    variant='ghost'
                    color='danger'
                    aria-label='delete project'
                    onClick={handleDeleteProject}
                    isLoading={isLoading}>
                    Delete
                  </Button>
                )}
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
