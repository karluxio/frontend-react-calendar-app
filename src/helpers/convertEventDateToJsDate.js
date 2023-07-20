import { parseISO } from "date-fns"

export const convertEventDateToJsDate = (events = []) => {
  return events.map(event => {
    return {
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end)
    }
  })
}