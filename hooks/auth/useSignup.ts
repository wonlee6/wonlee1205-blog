'use client'

import { useCallback, useMemo, useState } from 'react'
import { validateEmail } from '@/lib/utils'

type Form = {
  name: string
  email: string
  password: string
}

const useSignup = () => {
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    password: ''
  })
  const [memberTerms, setMemberTerms] = useState<string[]>([])

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible])

  const handleFormValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }, [])

  const handleMemberTerms = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '0') {
      setMemberTerms((prev) => (prev.includes(value) ? [] : prev.concat(['0', '1', '2', '3', '4'])))
      return
    }
    setMemberTerms((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : prev.concat(value)
    )
  }, [])

  const isInvalid = useMemo(() => {
    if (form.email === '') return false

    return validateEmail(form.email) ? false : true
  }, [form.email])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)
  }

  return {
    form,
    memberTerms,
    isVisible,
    onToggleVisibility: toggleVisibility,
    onFormValue: handleFormValue,
    onMemberTerms: handleMemberTerms,
    isInvalid,
    onSubmit: handleSubmit
  }
}

export default useSignup
