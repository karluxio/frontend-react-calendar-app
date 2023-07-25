import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice, store } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { act } from "@testing-library/react";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial state", () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  it("should login", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { uid: testUserCredentials.uid, name: testUserCredentials.name },
      status: "authenticated",
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));

    //works too!
    // expect(localStorage.getItem("token")).toBeDefined();
    // expect(localStorage.getItem("init-date")).toBeDefined();
  });

  it("should failed login", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "wrong@email.com",
        password: "wrong",
      });
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("token-init-date")).toBeNull();

    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      //   errorMessage: "invalid credentials", //! Warning: Can change on frontend or backend in the future
      errorMessage: expect.any(String), //* Better
      user: {},
      status: "not-authenticated",
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBeUndefined();
    });
  });

  it("should register", async () => {
    const newUser = {
      email: "new@email.com",
      password: "123456",
      name: "new user",
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "any-id",
        name: "test",
        token: "any-token",
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { uid: "any-id", name: "test" },
      status: "authenticated",
    });

    // clear spy for others tests
    spy.mockRestore();
  });

  it("should failed register", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: expect.any(String), //! "email in use",
      status: "not-authenticated",
      user: {},
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBeUndefined();
    });
  });
});
