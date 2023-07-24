import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('uiSlice', () => { 
    it('should return default state', () => {
        // expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()
        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen: false})
    })

    it('should change isDateModalOpen state', () => {
        let state = uiSlice.getInitialState()
        state = uiSlice.reducer(state, onOpenDateModal())
        expect(state.isDateModalOpen).toBeTruthy()
        
        state = uiSlice.reducer(state, onCloseDateModal())
        expect(state.isDateModalOpen).toBeFalsy()
    })
 })