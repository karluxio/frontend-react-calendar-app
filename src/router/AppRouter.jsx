import { Routes, Route, Navigate } from "react-router-dom"

import { CalendarPage } from "../calendar"
import { LoginPage } from "../auth"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"

export const AppRouter = () => {
  // const authStatus = 'not-authenticated' // 'checking', 'authenticated', 'not-authenticated'
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return (
      <h3>Loading...</h3>
    )
  }


  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? <Route path="/auth/*" element={<LoginPage />} />
          : <Route path="/*" element={<CalendarPage />} />
      }

      <Route path="/*" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}