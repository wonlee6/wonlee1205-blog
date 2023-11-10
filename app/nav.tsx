'use client'

import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import moon from '@/public/images/moon.svg'
import sun from '@/public/images/sun.svg'
import email from '@/public/images/email.svg'
import {send} from '@emailjs/browser'
import {Toast} from 'primereact/toast'

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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea
} from '@nextui-org/react'

function Nav() {
  const pathName = usePathname()
  const router = useRouter()

  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const [openModal, setOpenModal] = useState(false)
  const [form, setForm] = useState<{
    name: string
    email: string
    content: string
  }>({
    name: '',
    email: '',
    content: ''
  })
  const toastRef = useRef<Toast | null>(null)

  const handleSendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const result = await send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        {
          name: form.name,
          email: form.email,
          content: form.content
        },
        process.env.NEXT_PUBLIC_PUBLIC_KEY as string
      )
      if (result.status === 200) {
        toastRef.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: '이메일 전송 성공',
          life: 3000
        })
        setOpenModal(false)
      }
    } catch (error) {
      console.error(error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: '이메일 전송 실패',
        life: 3000
      })
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

  const isInvalidEmail = React.useMemo(() => {
    if (form.email === '') return false

    return validateEmail(form.email) ? false : true
  }, [form.email])

  return (
    <>
      <Navbar
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth='xl'
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

        <NavbarContent className='hidden sm:flex gap-10' justify='center'>
          <NavbarItem isActive={pathName === '/'}>
            <Link
              href={'/'}
              as={NextLink}
              color={pathName === '/' ? 'primary' : 'foreground'}
              underline={pathName === '/' ? 'always' : 'none'}
              size='lg'>
              Post
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName === '/chart'}>
            <Link
              href={'/chart'}
              as={NextLink}
              underline={pathName === '/chart' ? 'always' : 'none'}
              color={pathName === '/chart' ? 'primary' : 'foreground'}
              size='lg'>
              Chart
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName === '/gallery'}>
            <Link
              href={'/gallery'}
              as={NextLink}
              underline={pathName === '/gallery' ? 'always' : 'none'}
              color={pathName === '/gallery' ? 'primary' : 'foreground'}
              size='lg'>
              꼬비 사진첩
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathName === '/lol'}>
            <Link
              href={'/lol'}
              as={NextLink}
              underline={pathName === '/lol' ? 'always' : 'none'}
              color={pathName === '/lol' ? 'primary' : 'foreground'}
              size='lg'>
              LoL
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
                  alt={'moon'}
                  loading='lazy'
                />
              ) : (
                <Image
                  className={`cursor-pointer hover:opacity-90`}
                  width={30}
                  height={40}
                  src={sun}
                  alt={'sun'}
                  loading='lazy'
                />
              )}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              onClick={() => setOpenModal(true)}
              variant='light'
              className='p-0'>
              <Image
                className={`cursor-pointer hover:opacity-70`}
                src={email}
                alt='email'
                width={35}
              />
            </Button>
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
          <NavbarMenuItem>
            <Button
              onClick={() => {
                setIsMenuOpen(false)
                router.push('/chart')
              }}
              color='primary'
              className='w-full'
              size='lg'
              variant='ghost'>
              Chart
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button
              onClick={() => {
                setIsMenuOpen(false)
                router.push('/gallery')
              }}
              color='primary'
              className='w-full'
              size='lg'
              variant='ghost'>
              Gallery
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Modal isOpen={openModal} onOpenChange={() => setOpenModal(false)}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Contact</ModalHeader>
          <ModalBody>
            <Input
              value={form.name}
              label='Name'
              variant='bordered'
              color='primary'
              onValueChange={(value: string) => setForm({...form, name: value})}
            />
            <Input
              value={form.email}
              type='email'
              label='Email'
              variant='bordered'
              isInvalid={isInvalidEmail}
              color={isInvalidEmail ? 'danger' : 'primary'}
              errorMessage={isInvalidEmail && 'Please enter a valid email'}
              onValueChange={(value: string) =>
                setForm({...form, email: value})
              }
            />
            <Textarea
              value={form.content}
              label='content'
              variant='bordered'
              onValueChange={(value: string) =>
                setForm({...form, content: value})
              }
              maxRows={5}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='flat'
              onPress={() => setOpenModal(false)}>
              Close
            </Button>
            <Button color='primary' onClick={handleSendEmail}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toast ref={toastRef} position='top-right' />
    </>
  )
}

export default memo(Nav)

const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
