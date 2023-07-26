import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>Mock Calendar Page</h1>,
}));

describe("<AppRouter />", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("should shows loading and call checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);
    // screen.debug();

    expect(screen.getByText("Loading..."));
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  it("should shows login page if status is not authenticated", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/any-route"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign in/i));
    expect(screen.getByText(/register/i));
    expect(container).toMatchSnapshot();
  });

  it("should shows calendar page if status is authenticated", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText(/calendar/i));
  });
});
