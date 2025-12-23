'use client'

import React from 'react'
import { updateServerCounter } from './action';

export function ClientCounter() {
  const [count, setCount] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();
  
  const handleClick = () => {
    setCount((count) => count + 1)
    startTransition(async () => {
      await updateServerCounter(1)
    })
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      Client Counter: {count} {isPending && '⏳'}
    </button>
  )
}
