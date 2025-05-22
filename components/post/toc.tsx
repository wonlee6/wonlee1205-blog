'use client'

import React, { useEffect, useRef, useState } from 'react'

type Heading = {
  id: string
  level: number
  text: string
}

type Props = {
  headings: Heading[]
}

export default function Toc({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el)

    const callback: IntersectionObserverCallback = (entries) => {
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleHeadings.length > 0) {
        const topHeading = visibleHeadings[0].target
        setActiveId(topHeading.id)
      }
    }

    observer.current = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -60% 0px',
      threshold: 0.1
    })

    headingElements.forEach((el) => observer.current?.observe(el))

    return () => {
      observer.current?.disconnect()
    }
  }, [headings])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <nav className='sticky top-20'>
      <ul className='space-y-2 text-sm'>
        {headings.map((h) => {
          const isActive = activeId === h.id
          return (
            <li
              key={h.id}
              className={`transition-colors ${
                isActive
                  ? 'font-bold text-foreground-700'
                  : 'text-foreground-400 hover:text-foreground-600'
              }`}
              style={{ marginLeft: `${(h.level - 1) * 20}px` }}>
              <button onClick={() => handleClick(h.id)} className='w-full text-left'>
                {h.text}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
