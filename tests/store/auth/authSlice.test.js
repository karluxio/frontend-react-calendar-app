import { authSlice, onClearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authState"
import { testUserCredentials } from "../../fixtures/testUser"

describe('authSlice', () => { 
    it('should return default state', () => {
        expect(authSlice.getInitialState()).toEqual(initialState)
    })

    it('should login', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    })

    it('should logout', () => {
        const state = authSlice.reducer(authenticatedState, onLogout())
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })
    })

    it('should logout with error message', () => {
        const errorMsg = 'invalid credentials'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMsg))
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMsg
        })
    })

    it('should clear error message', () => {
        const errorMsg = 'invalid credentials'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMsg))

        const newState = authSlice.reducer(state, onClearErrorMessage())
        expect(newState.errorMessage).toBe(undefined)
    })
 })