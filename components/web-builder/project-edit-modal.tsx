'use client'

import { useRef, useState } from 'react'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@nextui-org/react'
import { z } from 'zod'

import { decryptFormData, encryptFormData } from '@/helper/editor.helper'
import { ProjectData, ProjectFormSchema, ProjectFormSchemaModel } from '@/types/web-builder'

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
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const [form, setForm] = useState<ProjectFormSchemaModel>({
    user_id: userId,
    type: modalType,
    projectName: modalType === 'add' ? '' : selectedItem!.projectName,
    description: modalType === 'add' ? '' : selectedItem!.description,
    selectedItemId: selectedItem?.id
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    let data = null

    try {
      const parseForm = ProjectFormSchema.parse(form)

      const encryptedData = encryptFormData(JSON.stringify(parseForm))

      if (modalType === 'add') {
        const response = await fetch('/api/web-builder/project', {
          method: 'POST',
          body: JSON.stringify({ data: encryptedData })
        })
        data = await response.json()
      } else {
        const response = await fetch('/api/web-builder/project', {
          method: 'POST',
          body: JSON.stringify({ data: encryptedData })
        })
        data = await response.json()
      }

      const decryptData = decryptFormData<ProjectData>(data.data)

      onSave(decryptData)
      onOpenChange()
    } catch (e) {
      if (e instanceof z.ZodError) {
        alert(e.issues[0].message)
        if (e.issues[0].path[0] === 'projectName') {
          nameRef.current?.focus()
        } else {
          descriptionRef.current?.focus()
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!selectedItem) return

    setIsDeleteLoading(true)

    try {
      const parseId = z.string().parse(form.selectedItemId)
      const encryptedData = encryptFormData(JSON.stringify({ id: parseId }))

      await fetch('/api/web-builder/project', {
        method: 'DELETE',
        body: JSON.stringify({ data: encryptedData })
      })

      onOpenChange()
      onDelete(parseId)
    } catch (e) {
      if (e instanceof z.ZodError) {
        alert(e.issues[0].message)
      }
    } finally {
      setIsDeleteLoading(false)
    }
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
                  value={form.projectName}
                  onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                  label='Project Name'
                  placeholder='Enter your project name'
                  variant='bordered'
                  title={form.projectName}
                  color='primary'
                  maxLength={100}
                />
                <Textarea
                  ref={descriptionRef}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  label='Description'
                  placeholder='Enter your description'
                  variant='bordered'
                  color='primary'
                  title={form.description}
                  maxLength={1000}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    input: 'resize-y min-h-[40px]'
                  }}
                />
              </ModalBody>
              <ModalFooter>
                {modalType === 'edit' && (
                  <Button
                    variant='light'
                    color='danger'
                    aria-label='delete project'
                    onClick={handleDeleteProject}
                    isLoading={isDeleteLoading}>
                    Delete
                  </Button>
                )}
                <Button color='primary' type='submit' isLoading={isLoading}>
                  Save
                </Button>
                <Button color='default' variant='shadow' onPress={onClose}>
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
