import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarState";

describe("calendarSlice", () => {
  it("should return the initial state", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  it("should handle set active event with onSetActiveEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  it("should handle add a new event with onAddNewEvent", () => {
    const newEvent = {
      id: "3",
      start: new Date("2022-07-24 09:00:00"),
      end: new Date("2022-07-24 11:00:00"),
      title: "Cumpleaños de Robert Doe",
      notes: "Alguna nota",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });

  it("should handle update an event with onUpdateEvent", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2020-05-20 09:00:00"),
      end: new Date("2020-05-20 11:00:00"),
      title: "Cumpleaños de Robert Doe!!!",
      notes: "Alguna nota actualizada",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    // expect(state.events[0]).toEqual(updatedEvent);
    expect(state.events).toContain(updatedEvent);
  });

  it("should handle delete an event with onDeleteEvent", () => {
    const deletedEvent = events[0];
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBeNull();
    expect(state.events).not.toContain(deletedEvent);
  });

  it("should handle load events with onLoadEvents", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    // not loading events when already loaded
    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(newState.isLoadingEvents).toBeFalsy();
    expect(newState.events.length).toEqual(events.length);
  });

  it("should handle logout with onLogoutCalendar", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
