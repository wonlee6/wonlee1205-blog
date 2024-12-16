'use client'

import React, { useCallback, useEffect, useState } from 'react'

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
  Spinner,
  useDisclosure
} from '@nextui-org/react'
import { Wallpaper, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import ProjectEditModal from './project-edit-modal'
import { decryptFormData } from '@/helper/editor.helper'
import { ProjectData } from '@/types/web-builder'

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
  const [selectedProject, setSelectedProject] = useState<ProjectData>()

  // const [funnelPageList, setFunnelPageList] = useState<ProjectData[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [modalType, setModalType] = useState<'add' | 'edit'>('add')

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await fetch('/api/web-builder/project-logout', {
      method: 'POST'
    })

    if (response.ok) {
      router.push(response.url)
    }
  }

  const handleSelectionChange = (keys: 'all' | Set<string | number>) => {
    setSelectedKeys(new Set(keys))
    const selectedId = [...new Set(keys)].join('')
    const findItem = projectDataList.find((i) => i.id === selectedId)
    setSelectedProject(findItem)
  }

  const handleGotoPage = () => {
    if (!selectedProject) return
    router.push(`${pathName}/editor/${selectedProject.id}`)
  }

  // const handleAddFunnelPageList = (e: React.MouseEvent<HTMLButtonElement>, item: ProjectData) => {
  //   e.stopPropagation()
  //   setFunnelPageList((prev) => [...prev, item])
  // }

  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>, startIndex: number) => {
  //   e.stopPropagation()

  //   e.dataTransfer.clearData()
  //   e.dataTransfer.setData('text/plain', String(startIndex))
  //   e.dataTransfer.effectAllowed = 'all'
  //   e.dataTransfer.dropEffect = 'copy'
  // }

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
  //   e.stopPropagation()
  //   const sourceIndex = e.dataTransfer.getData('text')

  //   if (Number(sourceIndex) !== dropIndex) {
  //     setFunnelPageList((prev) => {
  //       const dragItem = prev.at(Number(sourceIndex))
  //       return prev
  //         .filter((_, index) => index !== Number(sourceIndex))
  //         .toSpliced(dropIndex, 0, dragItem!)
  //     })
  //   }
  // }

  // const [funnelLoading, setFunnelLoading] = useState(false)
  // const handleSaveFunnelPage = async () => {
  //   setFunnelLoading(true)
  //   try {
  //     console.log(funnelPageList)
  //     const encryptedData = encryptFormData(JSON.stringify(funnelPageList))

  //     const response = await fetch('/api/web-builder/funnel-page', {
  //       method: 'POST',
  //       body: JSON.stringify({ data: encryptedData })
  //     })
  //     console.log(response)
  //     const data = await response.json()
  //   } catch (e) {
  //     console.error(e)
  //   } finally {
  //     setFunnelLoading(false)
  //   }
  // }

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
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [userId])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleEditProject = (e: React.MouseEvent<HTMLButtonElement>, project: ProjectData) => {
    e.stopPropagation()

    setSelectedProject(project)
    setSelectedKeys(new Set([project.id]))
    setModalType('edit')
    onOpen()
  }

  const handleAddProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setModalType('add')
    onOpen()
  }

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

  const handleDeleteProject = (id: string) => {
    setProjectDataList((prev) => prev.filter((i) => i.id !== id))
  }

  if (isLoading) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <section className='m-auto flex h-[60vh] w-[30vw] flex-col gap-2 rounded-md bg-[#f6f7f9] p-3 shadow-md dark:bg-default-100'>
      <div className='flex justify-end'>
        <Button
          variant='light'
          color='default'
          className='text-foreground-400 hover:text-foreground'
          size='sm'
          onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Card className='flex-auto' shadow='none' radius='none'>
        <CardHeader>
          <h2 className='select-none'>Landing Page List</h2>
          {/* <div className='w-1/2'>
            <h2 className='select-none'>Landing Page List</h2>
          </div>
          <Divider className='mx-2' orientation='vertical' />
          <div className='w-1/2'>
            <h2 className='select-none'>Funnel Page</h2>
          </div> */}
        </CardHeader>
        <Divider />
        <CardBody>
          {projectDataList.length > 0 ? (
            <Listbox
              variant='flat'
              aria-label='Listbox project with sections'
              disallowEmptySelection
              selectionMode='single'
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}>
              <ListboxSection>
                {projectDataList.map((i) => (
                  <ListboxItem
                    key={i.id}
                    classNames={{
                      title: 'truncate w-full',
                      description: 'truncate',
                      wrapper: 'overflow-hidden'
                    }}
                    description={i.description}
                    startContent={<Wallpaper size={40} />}
                    endContent={
                      <>
                        {/* <Button
                          onClick={(e) => handleAddFunnelPageList(e, i)}
                          isIconOnly
                          variant='light'
                          color='primary'>
                          <PlusIcon />
                        </Button> */}
                        <Button
                          onClick={(e) => handleEditProject(e, i)}
                          isIconOnly
                          variant='light'
                          color='default'>
                          <Settings />
                        </Button>
                      </>
                    }>
                    {i.projectName}
                  </ListboxItem>
                ))}
              </ListboxSection>
            </Listbox>
          ) : (
            'Please add a project'
          )}
          {/* <div className='flex h-full'>
            <div className='w-1/2 overflow-auto'>
              {projectDataList.length > 0 ? (
                <Listbox
                  variant='flat'
                  aria-label='Listbox project with sections'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeys={selectedKeys}
                  onSelectionChange={handleSelectionChange}>
                  <ListboxSection>
                    {projectDataList.map((i) => (
                      <ListboxItem
                        key={i.id}
                        classNames={{
                          title: 'truncate w-full',
                          description: 'truncate',
                          wrapper: 'overflow-hidden'
                        }}
                        description={i.description}
                        startContent={<Wallpaper size={40} />}
                        endContent={
                          <>
                            <Button
                              onClick={(e) => handleAddFunnelPageList(e, i)}
                              isIconOnly
                              variant='light'
                              color='primary'>
                              <PlusIcon />
                            </Button>
                            <Button
                              onClick={(e) => handleEditProject(e, i)}
                              isIconOnly
                              variant='light'
                              color='default'>
                              <Settings />
                            </Button>
                          </>
                        }>
                        {i.projectName}
                      </ListboxItem>
                    ))}
                  </ListboxSection>
                </Listbox>
              ) : (
                'Please add a project'
              )}
            </div>
            <Divider className='mx-2' orientation='vertical' />
            <div className='w-1/2 overflow-y-auto p-1 scrollbar-hide'>
              {funnelPageList.map((item, index) => {
                const isLastIndex = funnelPageList.length - 1 === index
                return (
                  <React.Fragment key={item.id}>
                    <div
                      className='flex cursor-grab rounded-lg bg-default-100 p-3 shadow-lg hover:bg-default-200'
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragOver={(e) => e.preventDefault()}>
                      <div className='w-1/12'>
                        <HouseIcon size={24} />
                      </div>
                      <div className='w-11/12 truncate'>
                        <span className='' title={item.projectName}>
                          {item.projectName}
                        </span>
                      </div>
                    </div>
                    {isLastIndex ? null : <ArrowBigDownDashIcon className='mx-auto my-1' />}
                  </React.Fragment>
                )
              })}
            </div>
          </div> */}
        </CardBody>
        <Divider />
        <CardFooter className='justify-end gap-2'>
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
          {/* <div className='flex w-1/2 justify-end gap-2'>
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
          </div>
          <Divider className='mx-2' orientation='vertical' />
          <div className='flex w-1/2 justify-end'>
            <Button
              onClick={handleSaveFunnelPage}
              variant='shadow'
              color='primary'
              isDisabled={funnelPageList.length === 0}>
              Save
            </Button>
          </div> */}
        </CardFooter>
      </Card>
      {isOpen && (
        <ProjectEditModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedItem={selectedProject}
          onSave={handleSave}
          onDelete={handleDeleteProject}
          modalType={modalType}
          userId={userId}
        />
      )}
    </section>
  )
}
