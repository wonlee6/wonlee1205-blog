'use client'

import {
  BoxSelectIcon,
  CircleArrowLeftIcon,
  FolderRootIcon,
  HeadingIcon,
  ImageIcon,
  LetterTextIcon,
  LinkIcon,
  PilcrowIcon,
  TagIcon,
  TextQuoteIcon,
  TypeIcon,
  YoutubeIcon
} from 'lucide-react'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

import { isEditorElementArray } from '@/helper/editor'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/providers/user-store-provider'
import { EditorElement } from '@/types/web-builder'

export default function LayersTab() {
  const [elements] = useEditorStore(useShallow((state) => [state.elements]))

  return (
    <div className='flex flex-col gap-1 rounded-md border bg-white p-2' role='tree'>
      {elements.map((i) => (
        <LayersRecursive key={i.id} {...i} />
      ))}
    </div>
  )
}

function LayersRecursive(props: EditorElement & { depth?: number }) {
  const { id, name, content, group, styles, customStyles, depth = 1 } = props

  const [selectedElement, onSelectElement] = useEditorStore(
    useShallow((state) => [state.selectedElement, state.onSelectElement])
  )

  if (!isEditorElementArray(content)) {
    return (
      <>
        <div
          className={cn(
            'flex cursor-pointer gap-2 rounded-md p-1 hover:bg-default-100',
            selectedElement.id === id ? 'bg-default-100' : ''
          )}
          role='treeitem'
          aria-selected={selectedElement.id === id}
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={() => onSelectElement({ id, name, content, group, styles, customStyles })}
          style={{ paddingLeft: `${depth}rem` }}>
          {ElementIcon[name as any]}
          {name}
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className={cn(
          'flex cursor-pointer gap-2 rounded-md p-1 hover:bg-default-100',
          selectedElement.id === id ? 'bg-default-100' : ''
        )}
        onClick={() => onSelectElement({ id, name, content, group, styles, customStyles })}
        role='treeitem'
        aria-selected={selectedElement.id === id}
        onKeyDown={() => {}}
        tabIndex={0}
        style={{ paddingLeft: id === '___body' ? '0.5rem' : `${depth}rem` }}>
        {group ? ContainerIcon[group as 'Body' | 'Structure'] : null}
        {name}
      </div>

      {content.length > 0
        ? content.map((i) => <LayersRecursive key={i.id} {...i} depth={depth + 1} />)
        : null}
    </>
  )
}

const ContainerIcon: Record<'Body' | 'Structure', React.ReactNode> = {
  Body: <FolderRootIcon />,
  Structure: <BoxSelectIcon />
}

const ElementIcon: Record<any, React.ReactNode> = {
  Heading: <HeadingIcon />,
  Paragraph: <PilcrowIcon />,
  TextLink: <LinkIcon />,
  BlockQuote: <TextQuoteIcon />,
  Label: <TagIcon />,
  Text: <TypeIcon />,
  TextArea: <LetterTextIcon />,
  Button: <CircleArrowLeftIcon />,
  Image: <ImageIcon />,
  YouTube: <YoutubeIcon />
}
