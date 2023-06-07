import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector(state => state.calendar)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }


  return {
    //* Properties
    activeEvent,
    events,

    //* Methods
    setActiveEvent,
    startSavingEvent
  }
}