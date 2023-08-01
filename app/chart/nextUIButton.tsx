'use client'

import React from 'react'
import {Button, ButtonProps} from '@nextui-org/react'

export default function NextUIButton(props: ButtonProps) {
  return <Button {...props}>{props.children}</Button>
}
