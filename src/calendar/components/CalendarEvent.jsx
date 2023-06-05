export const CalendarEvent = ({ event }) => {

  const { title, notes, start, end, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}