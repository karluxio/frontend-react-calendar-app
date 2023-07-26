import { useState, useMemo, useEffect } from "react";

import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useCalendarStore, useUiStore } from "../../hooks";
import { getEnvVariables } from "../../helpers";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// to avoid errors in testing environment
if (getEnvVariables().VITE_MODE !== "test") {
  Modal.setAppElement("#root");
}

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "some title",
    notes: "some notes",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    // return (formValues.title.length > 0) ? "is-valid" : "is-invalid"
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues, formSubmitted]);

  useEffect(() => {
    if (activeEvent) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const onInputChange = ({ target: { name, value } }) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onDateChange = (date, changing) => {
    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal("invalid dates", "check dates", "error").catch((e) => e);
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log({ formValues });

    startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  const onCloseModal = () => {
    console.log("close modal");
    closeDateModal();
    setActiveEvent(null);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            locale="es"
            selected={formValues.start}
            onChange={(date) => onDateChange(date, "start")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            locale="es"
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(date) => onDateChange(date, "end")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
