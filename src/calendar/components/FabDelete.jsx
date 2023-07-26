import { useDispatch } from "react-redux";
import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const onClick = () => {
    startDeletingEvent();
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-delete"
      style={{ display: hasEventSelected ? "" : "none" }}
      onClick={onClick}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
