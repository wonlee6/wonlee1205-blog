'use client'

import React, { useState } from 'react'

import { RecursiveComponent } from '@/model/web-builder'

export default function Heading(props: RecursiveComponent<'Heading'>) {
  const { content, name, id, styles, group, index, parentId } = props

  console.log(content)
  const [headingOption, setHeadingOption] = useState({
    text: content.text,
    heading: content.heading
  })

  return (
    <div className='relative w-full'>
      <ConvertHeading heading={headingOption.heading!} styles={styles}>
        {headingOption.text}
      </ConvertHeading>
      <h1 style={styles}>{headingOption.text}</h1>
    </div>
  )
}

function ConvertHeading(
  props: React.PropsWithChildren<{ heading: number; styles: React.CSSProperties }>
) {
  const { heading, styles, children } = props

  switch (heading) {
    case 1:
      return <h1 style={styles}>{children}</h1>
    case 2:
      return <h2 style={styles}>{children}</h2>
    case 3:
      return <h3 style={styles}>{children}</h3>
    case 4:
      return <h4 style={styles}>{children}</h4>
    case 5:
      return <h5 style={styles}>{children}</h5>
    case 6:
      return <h6 style={styles}>{children}</h6>
    default:
      return null
  }
}
