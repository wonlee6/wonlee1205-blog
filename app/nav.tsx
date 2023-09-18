'use client'

import React, {memo, useEffect, useLayoutEffect, useState} from 'react'
import moon from '@/public/images/moon.svg'
import sun from '@/public/images/sun.svg'
import Image from 'next/image'
import NextLink from 'next/link'
import {usePathname} from 'next/navigation'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from '@nextui-org/react'

function Nav() {
  const pathName = usePathname()
  const isHome = pathName === '/' ? true : false

  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className='shadow-md bg-opacity-20 backdrop-blur-sm bg-white dark:bg-black dark:text-neutral-50 dark:border-b dark:border-b-orange-200'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <p className='font-bold text-inherit text-2xl'>꼬비 집사 블로그</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem isActive={isHome}>
          <Link
            href={'/'}
            as={NextLink}
            color={isHome ? 'primary' : 'foreground'}
            underline={isHome ? 'always' : 'none'}
            size='lg'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={!isHome}>
          <Link
            href={'/chart'}
            as={NextLink}
            underline={!isHome ? 'always' : 'none'}
            color={!isHome ? 'primary' : 'foreground'}
            size='lg'>
            Chart
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button onClick={handleClick} variant='light'>
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
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color='danger' className='w-full' href='/' size='lg'>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color='foreground'
            className='w-full'
            href='/chart'
            size='lg'
            as={NextLink}>
            Chart
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default memo(Nav)
