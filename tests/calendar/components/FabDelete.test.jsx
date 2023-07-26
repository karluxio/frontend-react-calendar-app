import { render, screen, fireEvent } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

const mockStartDeletingEvent = jest.fn();
beforeEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllTimers());

describe("<FabDelete />", () => {
  it("should render", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    // console.log(btn.classList.toString());
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-delete");
    expect(btn.style.display).toBe("none");

    expect(btn.style.display).toBe("none");

    // screen.debug();
  });

  it("should render and show delete button when hasEventSelected=true", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");

    expect(btn.style.display).toBe("");
  });

  it("should call startDeletingEvent when btn-delete is clicked", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
