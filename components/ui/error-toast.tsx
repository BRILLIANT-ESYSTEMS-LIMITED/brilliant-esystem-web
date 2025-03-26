"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ErrorToastProps {
  initialErrors?: number
  onDismiss?: () => void
}

export function ErrorToast({ initialErrors = 0, onDismiss }: ErrorToastProps) {
  const [mounted, setMounted] = useState(false)
  const [errorCount, setErrorCount] = useState<number | null>(null)
  const router = useRouter()

  // Handle mounting safely
  useEffect(() => {
    // Use requestAnimationFrame to ensure we're in the browser
    const frame = requestAnimationFrame(() => {
      setMounted(true)
      setErrorCount(initialErrors)
    })
    return () => cancelAnimationFrame(frame)
  }, [initialErrors])

  // Handle unmounting
  useEffect(() => {
    return () => {
      setMounted(false)
      setErrorCount(null)
    }
  }, [])

  // Prevent any rendering until mounted
  if (!mounted || typeof window === 'undefined') {
    return null
  }

  const handleDismiss = () => {
    if (onDismiss) {
      // Wrap in requestAnimationFrame to ensure smooth transitions
      requestAnimationFrame(() => {
        onDismiss()
      })
    }
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4"
      suppressHydrationWarning
    >
      <div 
        className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md flex items-center space-x-2"
        role="alert"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-4 h-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm-3.57-6.94L8 5.5l3.57 3.56a.75.75 0 0 0 1.06-1.06L9.06 4.44a1.5 1.5 0 0 0-2.12 0L3.37 8a.75.75 0 0 0 1.06 1.06zM4.43 9.94L8 13.5l3.57-3.56a.75.75 0 0 1 1.06 1.06l-3.57 3.56a1.5 1.5 0 0 1-2.12 0L3.37 11a.75.75 0 0 1 1.06-1.06z" />
        </svg>
        <span suppressHydrationWarning>
          {errorCount !== null && (
            `${errorCount} error${errorCount !== 1 ? 's' : ''}`
          )}
        </span>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="ml-2 p-1 hover:bg-destructive-foreground/10 rounded-sm"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
} 