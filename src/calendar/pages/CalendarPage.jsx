import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, Navbar } from "../"
import { localizer, getMessages } from '../../helpers'

import { useUiStore } from '../../hooks'

const events = [
  {
    start: new Date(),
    end: addHours(new Date(), 2),
    title: "Some title",
    notes: 'some description',
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Luciano'
    }
  }
]

export const CalendarPage = () => {

  const { openDateModal, closeDateModal } = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem("lastView"))

  // const eventStyleGetter = (event, start, end, isSelected) => {
  const eventStyleGetter = () => {
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  const onDoubleClickEvent = (event) => {
    console.log({ onDoubleClickEvent: event });
    openDateModal()
  }

  const onSelectEvent = (event) => {
    console.log({ onSelectEvent: event });
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
        defaultView={lastView}
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
    </>
  )
}