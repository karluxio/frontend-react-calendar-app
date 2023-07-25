import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice, store } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { act } from "@testing-library/react";
import { testUserCredentials } from "../fixtures/testUser";

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
    localStorage.clear();

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

    // works too without async await!
    // act(() => {
    //   result.current.startLogin(testUserCredentials);
    // });

    // waitFor(() => {
    //   expect(result.current.user).toEqual(testUserCredentials);
    // });
  });

  it("should failed login", async () => {
    localStorage.clear();
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
});
