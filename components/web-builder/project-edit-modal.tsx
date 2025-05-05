'use client'

import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  PressEvent,
  Textarea
} from '@heroui/react'
import { useRef, useState } from 'react'
import { z } from 'zod'

import { decryptFormData, encryptFormData } from '@/helper/editor'
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
    page_name: modalType === 'add' ? '' : selectedItem!.page_name,
    description: modalType === 'add' ? '' : selectedItem!.description,
    selectedItemId: selectedItem?.id
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.page_name === selectedItem?.page_name) {
      addToast({
        title: 'Page name is the same',
        color: 'warning'
      })
      nameRef.current?.focus()
      return
    }

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

        if (response.status === 200 || response.status === 201) {
          addToast({
            title: 'Add Complete',
            color: 'primary'
          })
          data = await response.json()
        }
      } else {
        const response = await fetch('/api/web-builder/project', {
          method: 'PATCH',
          body: JSON.stringify({ data: encryptedData })
        })

        if (response.status === 200 || response.status === 201) {
          addToast({
            title: 'Update Complete',
            color: 'primary'
          })
          data = await response.json()
        }
      }
      if (!data) {
        return
      }
      const decryptData = decryptFormData<ProjectData>(data?.data)

      onSave(decryptData)
      onOpenChange()
    } catch (e) {
      if (e instanceof z.ZodError) {
        addToast({
          title: e.issues[0].message,
          color: 'danger'
        })
        if (e.issues[0].path[0] === 'page_name') {
          nameRef.current?.focus()
        } else {
          descriptionRef.current?.focus()
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (e: PressEvent) => {
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
        addToast({
          title: e.issues[0].message,
          color: 'danger'
        })
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
                  value={form.page_name}
                  onChange={(e) => setForm({ ...form, page_name: e.target.value })}
                  label='Page Name'
                  placeholder='Enter your page name'
                  variant='bordered'
                  title={form.page_name}
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
                    onPress={handleDeleteProject}
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
