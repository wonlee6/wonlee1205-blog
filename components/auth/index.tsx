'use client'

import { useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { AuthIcons } from './icons'
import { useUserStore } from '@/providers/user-store-provider'
import { useRouter } from 'next/navigation'

export default function AuthClient() {
  const { setUserInfo } = useUserStore((state) => state)

  const [isSignUp, setIsSignUp] = useState(true)

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

    const response = await fetchAuth(isSignUp, form.name, form.password)

    if (typeof response === 'undefined') {
      toast({
        variant: 'destructive',
        title: 'Invalid user info'
      })
      return
    }

    setUserInfo(response.id, response.name)
    router.push(`./project/${response.id}`)
  }

  return (
    <>
      <Card shadow='lg' className='w-[500px] p-2'>
        <CardHeader>
          <div className='flex flex-col items-start justify-center gap-2'>
            <h1 className='text-2xl'>{isSignUp ? `Welcome back` : 'Get started'}</h1>
            <h4 className='text-sm text-default-500'>
              {isSignUp ? `Sign in to your account` : 'Create a new account'}
            </h4>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete='false'>
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
              autoComplete='false'
            />
            <Button color='success' type='submit'>
              {isSignUp ? `Sign In` : 'Sign Up'}
            </Button>
          </form>
        </CardBody>

        <CardFooter className='justify-center'>
          <p className='text-sm text-foreground-500'>
            {isSignUp ? `Don't have an account?` : 'Have an account?'}
            <Button
              onClick={(e) => setIsSignUp(!isSignUp)}
              variant='light'
              className='cursor-pointer text-foreground underline transition hover:text-foreground-500'>
              {isSignUp ? 'Sign Up Now' : 'Sign In Now'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  )
}

async function fetchAuth(
  isSignup: boolean,
  name: string,
  password: string
): Promise<{ id: string; name: string } | undefined> {
  if (isSignup) {
    const { data } = await createClient()
      .from('member')
      .select()
      .eq('name', name)
      .eq('password', password)

    if (data && data?.length > 0) {
      const { id, name } = data[0]
      return {
        id,
        name
      }
    }
  } else {
    const { data } = await createClient()
      .from('member')
      .insert({
        name: name,
        password: password
      })
      .select()

    if (data && data.length > 0) {
      const { id, name } = data[0]
      return {
        id,
        name
      }
    }
  }

  return undefined
}
