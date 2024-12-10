'use client'

import React, { memo } from 'react'

function Utterance() {
  return (
    <section
      ref={(elem): void => {
        if (!elem) return

        const scriptElment = document.createElement('script')
        scriptElment.src = 'https://utteranc.es/client.js'
        scriptElment.async = true
        scriptElment.setAttribute('repo', 'wonlee6/wonlee1205-blog')
        scriptElment.setAttribute('issue-term', 'pathname')
        scriptElment.setAttribute('theme', 'github-dark-orange')
        scriptElment.setAttribute('crossorigin', 'anonymous')

        elem.appendChild(scriptElment)
      }}
      className='w-3/4'
    />
  )
}

export default memo(Utterance)
