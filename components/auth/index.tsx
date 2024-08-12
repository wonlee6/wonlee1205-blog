'use client'

import { useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { useToast } from '@/components/ui/use-toast'
import { AuthIcons } from './icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  authType: 'sign-up' | 'sign-in'
}

export default function AuthClient({ authType }: Props) {
  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false)
  const [isFirstPasswordFocus, setIsFirsPasswordFocus] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const [form, setForm] = useState<{ name: string; password: string }>({
    name: '',
    password: ''
  })

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.name) {
      nameRef.current?.focus()
      toast({
        variant: 'destructive',
        title: 'Uh oh! Name is required'
      })
      return
    }

    if (!form.password) {
      passwordRef.current?.focus()
      toast({
        variant: 'destructive',
        title: 'Uh oh! Password is required.'
      })
      return
    }

    // const response = await createClient().auth.signInWithOAuth({
    //   provider: 'github',
    //   options: {
    //     redirectTo: `http://localhost:3000/web-builder/project`
    //   }
    // })

    const response = await fetch(`/api/web-builder/${authType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        password: form.password
      })
    })

    if (response.status === 200) {
      const data = await response.json()
      router.push(`/web-builder/project/${data.id}`)
    } else {
      toast({
        variant: 'destructive',
        title: response.statusText
      })
    }
  }

  return (
    <>
      <Card shadow='lg' className='w-[500px] p-2'>
        <CardHeader>
          <div className='flex flex-col items-start justify-center gap-2'>
            <h1 className='text-2xl'>{authType === 'sign-in' ? `Welcome back` : 'Get started'}</h1>
            <h4 className='text-sm text-default-500'>
              {authType === 'sign-in' ? `Sign in to your account` : 'Create a new account'}
            </h4>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete='off'>
            <Input
              ref={nameRef}
              label='Name'
              value={form.name}
              onValueChange={(e) => setForm((prev) => ({ ...prev, name: e }))}
              variant='underlined'
              isInvalid={isFirstNameFocus}
              errorMessage={'Name is required'}
              isClearable
              onBlur={() => {
                if (form.name === '') {
                  setIsFirstNameFocus(true)
                }
              }}
              onFocus={() => setIsFirstNameFocus(false)}
              maxLength={50}
              type='text'
            />
            <Input
              ref={passwordRef}
              type={isVisible ? 'text' : 'password'}
              label='Password'
              value={form.password}
              onValueChange={(e) => setForm((prev) => ({ ...prev, password: e }))}
              variant='underlined'
              color='default'
              endContent={
                <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                  {isVisible ? (
                    <AuthIcons.eye className='pointer-events-none text-2xl text-default-400' />
                  ) : (
                    <AuthIcons.eyeOff className='pointer-events-none text-2xl text-default-400' />
                  )}
                </button>
              }
              onBlur={() => {
                if (form.password === '') {
                  setIsFirsPasswordFocus(true)
                }
              }}
              onFocus={() => setIsFirsPasswordFocus(false)}
              isInvalid={isFirstPasswordFocus}
              errorMessage={'Password is required'}
              maxLength={20}
            />
            <Button color='success' type='submit'>
              {authType === 'sign-in' ? `Sign In` : 'Sign Up'}
            </Button>
          </form>
        </CardBody>

        <CardFooter className='justify-center'>
          <p className='text-sm text-foreground-500'>
            {authType === 'sign-in' ? `Don't have an account?` : 'Have an account?'}
            <Button
              variant='light'
              className='cursor-pointer text-foreground underline transition hover:text-foreground-500'>
              <Link href={`./${authType === 'sign-in' ? 'sign-up' : 'sign-in'}`} prefetch>
                {authType === 'sign-in' ? 'Sign Up Now' : 'Sign In Now'}
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  )
}
