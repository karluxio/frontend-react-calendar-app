import { useDispatch, useSelector } from "react-redux"
import { parseISO } from 'date-fns'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi"
import { convertEventDateToJsDate } from "../helpers/convertEventDateToJsDate"
import Swal from "sweetalert2"

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {

    const parsedStart = new Date(calendarEvent.start).getTime()
    const parsedEnd = new Date(calendarEvent.end).getTime()

    // if exists then update
    if (calendarEvent.id) {

      try {
        await calendarApi.put(`/events/${calendarEvent.id}`, {
          ...calendarEvent,
          start: parsedStart,
          end: parsedEnd
        })
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return

      } catch (error) {
        console.log({ error });
        Swal('Error', error.response.data.msg, 'error')
        return
      }

    }


    // if not exists then create
    try {
      const { data } = await calendarApi.post(
        '/events',
        {
          ...calendarEvent,
          start: parsedStart,
          end: parsedEnd,

        }
      )

      console.log({ data });

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.savedEvent.id, user }))

    } catch (error) {
      console.log({ error })
      Swal('Error', error.response.data.msg, 'error')
    }

  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.log({ error })
      Swal('Error', error.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events')
      const parsedEvents = convertEventDateToJsDate(data.events)

      dispatch(onLoadEvents(parsedEvents))

    } catch (error) {
      console.log({ error })
      Swal('Error', error.response.data.msg, 'error')
    }
  }

  return {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}