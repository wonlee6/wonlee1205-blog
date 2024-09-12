'use client'

import React, { useState } from 'react'

import { RecursiveComponent } from '@/model/web-builder'

export default function Heading(props: RecursiveComponent<'Heading'>) {
  const { content, name, id, styles, group, index, parentId } = props

  console.log(content)
  const [headingOption, setHeadingOption] = useState({
    text: content.innerText,
    heading: content.heading
  })

  return (
    <div className='relative w-full'>
      <h1 style={styles}>{headingOption.text}</h1>
    </div>
  )
}

function convertHeading(heading: number, text: string) {
  switch (heading) {
    case 1:
      return <h1>{text}</h1>
    case 2:
      return <h2>{text}</h2>
    case 3:
      return <h3>{text}</h3>
    case 4:
      return <h4>{text}</h4>
    case 5:
      return <h5>{text}</h5>
    case 6:
      return <h6>{text}</h6>
    default:
      return null
  }
}
