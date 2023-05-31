import { Routes, Route, Navigate } from "react-router-dom"

import { CalendarPage } from "../calendar"
import { LoginPage } from "../auth"

export const AppRouter = () => {
  const authStatus = 'authenticated'

  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
          ? <Route path="/auth/*" element={<LoginPage />} />
          : <Route path="/*" element={<CalendarPage />} />
      }

      <Route path="/*" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}