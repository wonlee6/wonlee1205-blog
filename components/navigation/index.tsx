'use client'

import React, {useCallback, useEffect, useLayoutEffect, useState, useTransition} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import NextLink from 'next/link'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Switch
} from '@nextui-org/react'
import {NavIcons} from './icons'

export default function HeaderNaviBar() {
  const pathName = usePathname()
  const router = useRouter()

  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [isPending, startTransition] = useTransition()

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
    <>
      <Navbar
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className='dark:border-b-default-400 shadow-md backdrop-blur-sm dark:border-b dark:text-neutral-50'>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <p className='text-2xl font-bold text-inherit'>꼬비 집사 블로그</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden gap-4 sm:flex' justify='end'>
          <NavbarItem isActive={pathName === '/'}>
            <Link
              href={'/'}
              as={NextLink}
              color={pathName.includes('post') || pathName === '/' ? 'primary' : 'foreground'}
              underline={pathName.includes('post') || pathName === '/' ? 'always' : 'none'}
              size='lg'
              isBlock>
              Post
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName === '/chart'}>
            <Link
              href={'/chart'}
              as={NextLink}
              underline={pathName === '/chart' ? 'always' : 'none'}
              color={pathName === '/chart' ? 'primary' : 'foreground'}
              size='lg'
              isBlock>
              Chart
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            <Switch
              isSelected={isDarkMode}
              size='lg'
              color='default'
              startContent={<NavIcons.Moon />}
              endContent={<NavIcons.Sun />}
              onValueChange={handleTheme}
            />
          </NavbarItem>
        </NavbarContent>
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
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  )
}
