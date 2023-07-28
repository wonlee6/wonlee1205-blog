'use client'

import React, {useMemo} from 'react'
import {useRouter} from 'next/navigation'
import {PanelMenu} from 'primereact/panelmenu'
import type {MenuItem} from 'primereact/menuitem'
import {PostData} from './page'

interface Props {
  allPostsData: PostData[]
}

export default function AsideMenu({allPostsData}: Props) {
  const router = useRouter()

  const filteredAllPostsData: MenuItem[] = useMemo(() => {
    return allPostsData
      .reduce((acc: any, cur: PostData) => {
        if (acc.find((i: any) => i.label === cur.tag)) {
          return acc.map((v: any) => {
            if (v.label === cur.tag) {
              return {
                ...v,
                items: [
                  ...v.items,
                  {
                    id: cur.id,
                    label: cur.title,
                    command(event: any) {
                      router.push(`/post/${event.item.id}`)
                    }
                  }
                ]
              }
            }
            return v
          })
        }
        const createMenuData: MenuItem = {
          label: cur.tag,
          expanded: true,
          items: [
            {
              id: cur.id,
              label: cur.title,
              command(event) {
                router.push(`/post/${event.item.id}`)
              }
            }
          ]
        }
        return [...acc, createMenuData]
      }, [])
      .sort((a: any, b: any) => {
        if (a.label > b.label) {
          return -1
        } else if (a.label < b.label) {
          return 1
        } else {
          return 0
        }
      })
  }, [allPostsData, router])

  return (
    <PanelMenu
      model={filteredAllPostsData}
      multiple
      className='w-full md:w-25rem'
    />
  )
}
