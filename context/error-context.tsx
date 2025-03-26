"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect
} from 'react'
import { ErrorToast } from '@/components/ui/error-toast'

interface ErrorItem {
  id: string
  message: string
  timestamp: number
}

interface ErrorContextType {
  setErrorCount: (count: number) => void
  clearErrors: () => void
  addError: (error: Error | string) => void
  errors: ErrorItem[]
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [errorItems, setErrorItems] = useState<ErrorItem[]>([])

  // Handle mounting safely
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const addError = useCallback((error: Error | string) => {
    const errorMessage = error instanceof Error ? error.message : error
    setErrorItems(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message: errorMessage,
        timestamp: Date.now()
      }
    ])
  }, [])

  const setErrorCount = useCallback((count: number) => {
    if (count > 0) {
      setErrorItems([{
        id: crypto.randomUUID(),
        message: `${count} error${count !== 1 ? 's' : ''} occurred`,
        timestamp: Date.now()
      }])
    } else {
      setErrorItems([])
    }
  }, [])

  const clearErrors = useCallback(() => {
    setErrorItems([])
  }, [])

  // Auto-clear errors after 5 seconds
  useEffect(() => {
    if (errorItems.length > 0) {
      const timer = setTimeout(() => {
        clearErrors()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorItems, clearErrors])

  // Don't render anything until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ErrorContext.Provider value={{ setErrorCount, clearErrors, addError, errors: errorItems }}>
      {children}
      {errorItems.length > 0 && (
        <ErrorToast
          initialErrors={errorItems.length}
          onDismiss={clearErrors}
        />
      )}
    </ErrorContext.Provider>
  )
}

export function useErrors() {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useErrors must be used within an ErrorProvider')
  }
  return context
} 