export const convertEventDateToJsDate = (events = []) => {

  return events.map(event => {

    event.start = new Date(event.start)
    event.end = new Date(event.end)

    return event;
  })
}