export const events = [
  {
    id: "1",
    start: new Date("2022-07-24 09:00:00"),
    end: new Date("2022-07-24 11:00:00"),
    title: "Cumpleaños de John Doe",
    notes: "Alguna nota",
  },
  {
    id: "2",
    start: new Date("2022-08-24 09:00:00"),
    end: new Date("2022-08-24 11:00:00"),
    title: "Cumpleaños de Mengano Doe",
    notes: "Alguna nota",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
