'use client'

import React, {memo} from 'react'
import {Button, ButtonProps} from '@nextui-org/react'

const NextUIButton = (props: ButtonProps) => {
  return <Button {...props}>{props.children}</Button>
}

export default memo(NextUIButton)
