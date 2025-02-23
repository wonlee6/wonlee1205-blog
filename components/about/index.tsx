'use client'

import { useState } from 'react'

// import Link from 'next/link'
import { Button, Tooltip } from '@heroui/react'
import { Github, Mail } from 'lucide-react'

export default function AboutClient() {
  const [isCopy, setIsCopy] = useState(false)

  const handleCopy = () => {
    window.navigator.clipboard.writeText('wonlee6@gmail.com')
    setIsCopy(true)
  }

  return (
    <>
      <div className='flex items-center justify-end gap-4'>
        {/* <Tooltip content='Github' showArrow>
          <Button isIconOnly aria-label='go to github' variant='light'>
            <Link href={`https://github.com/wonlee6`} target='_blank'>
              <Github size={30} />
            </Link>
          </Button>
        </Tooltip> */}

        <Tooltip content={isCopy ? 'copied' : 'copy'} showArrow>
          <Button aria-label={isCopy ? 'copied' : 'copy mail'} variant='light' onPress={handleCopy}>
            wonlee6@gmail.com
            <Mail size={30} />
          </Button>
        </Tooltip>
      </div>
    </>
  )
}
