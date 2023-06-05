export const CalendarEvent = ({ event }) => {

  const { title, notes, start, end, user } = event

  console.log({ user: user.name, title, notes, start, end });
  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}