'use client'

import React, { useCallback, useEffect, startTransition, useLayoutEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import NextLink from 'next/link'

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Switch
} from '@nextui-org/react'
import { NavIcons } from './icons'

export default function HeaderNaviBar() {
  const pathName = usePathname()
  const router = useRouter()

  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleTheme = useCallback(
    (event: boolean) => {
      if (event) {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        setTheme('light')
        localStorage.setItem('theme', 'light')
      }
      startTransition(() => {
        setIsDarkMode(event)
      })
    },
    [setTheme]
  )

  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark')
      setIsDarkMode(true)
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

  if (pathName.includes('editor')) {
    return null
  }

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        isBlurred
        className='backdrop-blur-sm'>
        <NavbarContent justify='start'>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
        </NavbarContent>

        <NavbarContent className='hidden gap-4 sm:flex' justify='end'>
          <NavbarItem isActive={pathName === '/'}>
            <Link
              href={'/'}
              as={NextLink}
              color={pathName.includes('post') || pathName === '/' ? 'primary' : 'foreground'}
              underline={pathName.includes('post') || pathName === '/' ? 'always' : 'none'}
              isBlock
              prefetch>
              Post
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName === '/chart'}>
            <Link
              href={'/chart'}
              as={NextLink}
              underline={pathName === '/chart' ? 'always' : 'none'}
              color={pathName === '/chart' ? 'primary' : 'foreground'}
              prefetch
              isBlock>
              Chart
            </Link>
          </NavbarItem>
          {/* <NavbarItem isActive={pathName === '/web-builder/sign-in'}>
            <Link
              href={'/web-builder/sign-in'}
              as={NextLink}
              underline={pathName === '/web-builder/sign-in' ? 'always' : 'none'}
              color={pathName === '/web-builder/sign-in' ? 'primary' : 'foreground'}
              prefetch
              isBlock>
              web-builder
            </Link>
          </NavbarItem> */}
          <NavbarItem isActive={pathName === '/about'}>
            <Link
              href={'/about'}
              as={NextLink}
              underline={pathName === '/about' ? 'always' : 'none'}
              color={pathName === '/about' ? 'primary' : 'foreground'}
              prefetch
              isBlock>
              About
            </Link>
          </NavbarItem>
        </NavbarContent>

        <Switch
          isSelected={isDarkMode}
          size='lg'
          color='default'
          startContent={<NavIcons.Moon />}
          endContent={<NavIcons.Sun />}
          onValueChange={handleTheme}
        />

        <NavbarMenu className='gap-y-4'>
          <NavbarMenuItem>
            <Button
              onClick={() => {
                setIsMenuOpen(false)
                router.push('/')
              }}
              color='primary'
              className='w-full'
              size='lg'
              variant='ghost'>
              Post
            </Button>
            <Button
              onClick={() => {
                setIsMenuOpen(false)
                router.push('/about')
              }}
              color='primary'
              className='w-full'
              size='lg'
              variant='ghost'>
              About
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  )
}
