'use client'

import React, {memo, useEffect, useLayoutEffect, useState} from 'react'
import styles from './nav.module.css'
import moon from '@/public/images/moon.svg'
import sun from '@/public/images/sun.svg'
import Image from 'next/image'
import useScrollDown from '@/hooks/useScrollDown'
import Link from 'next/link'

function Nav() {
  const isScrollDown = useScrollDown()

  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const handleClick = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark')
      return
    }
    setTheme('light')
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <nav
      className={`w-full shadow-md bg-opacity-20 backdrop-blur-sm bg-white dark:bg-black dark:text-neutral-50 dark:border-b dark:border-b-orange-200
       ${isScrollDown ? styles.downdown : ''}`}>
      <div className='w-3/4 xl:w-8/12 my-0 mx-auto flex justify-center'>
        <div className='w-full h-16 flex justify-between items-center'>
          <div>
            <Link className='cursor-pointer text-2xl font-semibold' href={'/'}>
              꼬비 집사 블로그
            </Link>
          </div>
          <div className='flex justify-center'>
            <ul className='flex text-xl font-semibold'>
              <li className='mr-10 cursor-pointer'>
                <Link href={'/'}>Posting</Link>
              </li>
              <li className='cursor-pointer'>
                <Link href={'/chart'}>Charts</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <button onClick={handleClick}>
                  {theme === 'light' ? (
                    <Image
                      className={`cursor-pointer hover:opacity-70`}
                      width={30}
                      height={40}
                      src={moon}
                      alt={moon}
                      loading='lazy'
                    />
                  ) : (
                    <Image
                      className={`cursor-pointer hover:opacity-90`}
                      width={30}
                      height={40}
                      src={sun}
                      alt={sun}
                      loading='lazy'
                    />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default memo(Nav)
