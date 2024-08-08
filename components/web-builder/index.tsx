'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Listbox,
  ListboxItem,
  ListboxSection,
  useDisclosure
} from '@nextui-org/react'
import React, { useCallback, useMemo, useState } from 'react'
import { Wallpaper, Settings } from 'lucide-react'
import ProjectEditModal from './project-edit-modal'
import { createClient } from '@/lib/supabase/client'

export type ProjectData = {
  id: string
  created_at: string
  projectName: string
  description: string
  contents: unknown
}

type Props = {
  projectData: ProjectData[]
}

export default function WebBuilderRoot(props: Props) {
  const { projectData } = props

  const [projectDataList, setProjectDataList] = useState<ProjectData[]>(projectData)

  const [selectedKeys, setSelectedKeys] = useState<'all' | Iterable<string | number> | undefined>(
    new Set()
  )
  const [modalType, setModalType] = useState<'add' | 'edit'>('add')

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const hanldeEditProject = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setModalType('edit')
    onOpen()
  }

  const handleAddProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setModalType('add')
    onOpen()
  }

  const handleDeletProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const response = await createClient()
      .from('project')
      .delete()
      .eq('id', filteredSelectedProject?.id)

    if (response.error) {
      alert('failed')
      return
    }
    setProjectDataList((prev) => prev.filter((i) => i.id !== filteredSelectedProject?.id))
  }

  const filteredSelectedProject = useMemo(() => {
    if (!selectedKeys) {
      return undefined
    }
    const selectedId = [...new Set(selectedKeys)].join('')
    return projectDataList.find((i) => i.id === selectedId)
  }, [selectedKeys, projectDataList])

  const handleSave = useCallback(
    (item: ProjectData) => {
      if (modalType === 'add') {
        setProjectDataList((prev) => [...prev, item])
        return
      }
      setProjectDataList((prev) =>
        prev.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              projectName: item.projectName,
              description: item.description
            }
          }
          return i
        })
      )
    },
    [modalType]
  )

  return (
    <>
      <Card className='w-[500px]' shadow='md'>
        <CardHeader>Project</CardHeader>
        <CardBody className='max-h-[400px] overflow-y-auto'>
          <Listbox
            variant='flat'
            aria-label='Listbox project with sections'
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}>
            <ListboxSection>
              {projectDataList.map((i) => (
                <ListboxItem
                  key={i.id}
                  description={i.description}
                  startContent={<Wallpaper size={28} />}
                  endContent={
                    <Settings
                      onClick={hanldeEditProject}
                      className='transition-all hover:scale-125'
                    />
                  }>
                  {i.projectName}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </CardBody>
        <CardFooter className='justify-end gap-4'>
          <Button
            variant='shadow'
            color='success'
            aria-label='add project'
            onClick={handleAddProject}>
            Add
          </Button>
          <Button
            variant='light'
            color='danger'
            aria-label='delete project'
            onClick={handleDeletProject}>
            Delete
          </Button>
        </CardFooter>
      </Card>
      {isOpen && (
        <ProjectEditModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedItem={filteredSelectedProject}
          onSave={handleSave}
          modalType={modalType}
        />
      )}
    </>
  )
}
