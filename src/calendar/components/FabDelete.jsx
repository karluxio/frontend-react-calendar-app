import { useDispatch } from "react-redux"
import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

  const dispatch = useDispatch()
  const { startDeletingEvent, hasEventSelected } = useCalendarStore()

  const onClick = () => {
    dispatch(startDeletingEvent())
  }

  return (
    <button
      className="btn btn-danger fab-delete"
      style={{ display: hasEventSelected ? '' : 'none' }}
      onClick={onClick}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}