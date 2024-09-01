'use client'

import React from 'react'

import { FolderRoot, SquareDashedMousePointer, SquareMousePointer } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { isElementType } from '@/helper/editor.helper'
import { cn } from '@/lib/utils'
import { ComponentGroup, EditorElement } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function LayersTab() {
  const [elements] = useEditorStore(useShallow((state) => [state.elements]))

  return (
    <div className='flex flex-col gap-1 rounded-md border p-2' role='tree'>
      {elements.map((i) => (
        <LayersRecursive key={i.id} {...i} />
      ))}
    </div>
  )
}

function LayersRecursive(props: EditorElement & { depth?: number }) {
  const { id, name, content, group, styles, depth = 1 } = props

  const [selectedElement, onSelectElement] = useEditorStore(
    useShallow((state) => [state.selectedElement, state.onSelectElement])
  )

  if (isElementType(content)) {
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
          onClick={() => onSelectElement({ id, name, content, group, styles })}
          style={{ paddingLeft: `${depth}rem` }}>
          <SquareMousePointer />
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
        onClick={() => onSelectElement({ id, name, content, group, styles })}
        role='treeitem'
        aria-selected={selectedElement.id === id}
        onKeyDown={() => {}}
        tabIndex={0}
        style={{ paddingLeft: id === '___body' ? '0.5rem' : `${depth}rem` }}>
        {group ? LayerIcon[group as Exclude<ComponentGroup, 'Element' | null>] : null}
        {name}
      </div>

      {content.length > 0
        ? content.map((i) => <LayersRecursive key={i.id} {...i} depth={depth + 1} />)
        : null}
    </>
  )
}

const LayerIcon = {
  Body: <FolderRoot />,
  Layout: <SquareDashedMousePointer />
}
