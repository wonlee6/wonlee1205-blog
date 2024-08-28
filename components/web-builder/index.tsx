'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  ListboxSection,
  useDisclosure
} from '@nextui-org/react'
import { Wallpaper, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import ProjectEditModal from './project-edit-modal'
import { decryptFormData } from '@/helper/editor.helper'
import { FunnelPage, ProjectData } from '@/model/web-builder'

type Props = {
  userId: string
}

export default function ProjectRoot(props: Props) {
  const { userId } = props

  const pathName = usePathname()
  const router = useRouter()

  const [projectDataList, setProjectDataList] = useState<ProjectData[]>([])

  const [selectedKeys, setSelectedKeys] = useState<'all' | Iterable<string | number> | undefined>(
    new Set()
  )

  // const [funnelPageList, setFunnelPageList] = useState<FunnelPage[]>([])

  const [modalType, setModalType] = useState<'add' | 'edit'>('add')

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleEditProject = (e: React.MouseEvent<SVGSVGElement>) => {
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

  const handleDeleteProject = (id: string) => {
    setProjectDataList((prev) => prev.filter((i) => i.id !== id))
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

  const handleGotoPage = () => {
    const selectedId = [...new Set(selectedKeys)].join('')
    router.push(`${pathName}/editor/${selectedId}`)
  }

  const handleLogout = async (e: React.MouseEvent) => {
    const response = await fetch('/api/web-builder/project/logout', {
      method: 'POST'
    })

    if (response.ok) {
      router.push('/web-builder/sign-in')
    }
  }

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier, no-extra-semi
    ;(async () => {
      try {
        const response = await fetch('/api/web-builder/project', {
          method: 'GET'
        })
        const data = await response.json()
        const decryptData = decryptFormData<ProjectData[]>(data.data)

        setProjectDataList(decryptData as ProjectData[])
      } catch (error) {
        console.error
      }
    })()
  }, [userId])

  return (
    <>
      <Card className='m-auto h-[50vh] w-[25vw]' shadow='md'>
        <CardHeader className='justify-between'>
          <h2>Project</h2>
          <Button
            variant='light'
            color='default'
            className='text-foreground-400 hover:text-foreground'
            onClick={handleLogout}>
            Logout
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className='overflow-y-auto'>
          {projectDataList.length > 0 ? (
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
                        onClick={handleEditProject}
                        className='transition-all hover:scale-125'
                      />
                    }>
                    {i.projectName}
                  </ListboxItem>
                ))}
              </ListboxSection>
            </Listbox>
          ) : (
            'Please add a project'
          )}
        </CardBody>
        <Divider />
        <CardFooter className='justify-end gap-4'>
          <Button
            onClick={handleGotoPage}
            variant='ghost'
            color='primary'
            isDisabled={new Set(selectedKeys).size === 0}>
            Go to Page
          </Button>
          <Button
            variant='shadow'
            color='success'
            aria-label='add project'
            onClick={handleAddProject}>
            Add Project
          </Button>
        </CardFooter>
      </Card>
      {isOpen && (
        <ProjectEditModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedItem={filteredSelectedProject}
          onSave={handleSave}
          onDelete={handleDeleteProject}
          modalType={modalType}
          userId={userId}
        />
      )}
    </>
  )
}
