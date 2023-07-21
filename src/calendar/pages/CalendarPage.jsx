import { useState, useEffect } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"

import { localizer, getMessages } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'

export const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  useEffect(() => {
    startLoadingEvents()
    console.log({ events })
  }, [])

  const { openDateModal } = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem("lastView"))

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  const onDoubleClickEvent = () => {
    openDateModal()
  }

  const onSelectEvent = (event) => {
    setActiveEvent(event)
  }

  const onView = (event) => {
    localStorage.setItem("lastView", event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView ? lastView : 'month'}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onView}
      />

      <CalendarModal />

      <FabAddNew />

      <FabDelete />
    </>
  )
}