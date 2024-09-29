'use client'

import React, { useMemo } from 'react'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { useShallow } from 'zustand/react/shallow'

import CustomStyle from './styles-tab/custom-style'
import DecorationStyle from './styles-tab/decoration-style'
import DimensionsStyle from './styles-tab/dimensions-style'
import FlexBoxStyle from './styles-tab/flexbox-style'
import TypographyStyle from './styles-tab/typography-style'
import { useEditorStore } from '@/providers/user-store-provider'

export default function StylesTab() {
  const [selectedElement, uploadImages] = useEditorStore(
    useShallow((state) => [state.selectedElement, state.uploadImages])
  )

  const isSelectedItem = selectedElement.id === ''
  const isLayout = selectedElement.group !== 'Structure'

  const selectedStyles = useMemo(() => selectedElement.styles, [selectedElement])
  const hasSelectedItem = selectedElement.id !== '' && selectedElement.group === 'Structure'
  const isFlex = selectedStyles.display !== 'flex'

  return (
    <Accordion
      selectionMode='multiple'
      variant='shadow'
      className='rounded-none'
      defaultExpandedKeys='all'>
      <AccordionItem
        key='1'
        aria-label='CustomBox'
        title='CustomBox'
        classNames={{ heading: 'font-bold' }}
        isDisabled={isSelectedItem}>
        <CustomStyle key={selectedElement.id} customStyles={selectedElement.customStyles} />
      </AccordionItem>

      <AccordionItem
        key='2'
        aria-label='Typography'
        title='Typography'
        classNames={{ heading: 'font-bold', content: 'pb-4' }}
        isDisabled={isSelectedItem}>
        <TypographyStyle key={selectedElement.id} selectedStyles={selectedStyles} />
      </AccordionItem>

      <AccordionItem
        key='3'
        aria-label='Dimensions'
        title='Dimensions'
        classNames={{ heading: 'font-bold' }}
        isDisabled={isSelectedItem}>
        <DimensionsStyle key={selectedElement.id} selectedStyles={selectedStyles} />
      </AccordionItem>

      <AccordionItem
        key='4'
        aria-label='Decorations'
        title='Decorations'
        classNames={{ heading: 'font-bold' }}
        isDisabled={isSelectedItem}>
        <DecorationStyle
          key={selectedElement.id}
          selectedStyles={selectedStyles}
          hasSelectedItem={hasSelectedItem}
          uploadImages={uploadImages}
        />
      </AccordionItem>

      <AccordionItem
        key='5'
        aria-label='Flexbox'
        title='Flexbox'
        isDisabled={isSelectedItem || isLayout || isFlex}
        classNames={{ heading: 'font-bold' }}>
        <FlexBoxStyle
          key={selectedElement.id}
          selectedStyles={selectedStyles}
          componentGroup={selectedElement.group}
        />
      </AccordionItem>
    </Accordion>
  )
}
