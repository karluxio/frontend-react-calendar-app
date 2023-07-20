import { useDispatch, useSelector } from "react-redux"
import { getUnixTime } from 'date-fns'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi"
import { convertEventDateToJsDate } from "../helpers/convertEventDateToJsDate"

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {

    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {

      try {

        const startUnix = getUnixTime(calendarEvent.start)
        const endUnix = getUnixTime(calendarEvent.end)

        const { data } = await calendarApi.post(
          '/events',
          {
            ...calendarEvent,
            start: startUnix,
            end: endUnix
          }
        )

        console.log({ data })
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.savedEvent.id, user }))

      } catch (error) {
        console.log({ error })
        Swal('Error', error.response.data.msg, 'error')
      }
    }
  }

  const startDeletingEvent = (calendarEvent) => {
    dispatch(onDeleteEvent({ ...calendarEvent }))
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