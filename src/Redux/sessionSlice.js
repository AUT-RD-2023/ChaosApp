import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        gamePin: "",
        identity: null,
        isHost: false,
    },
    reducers: {
        setSessionId: (state, action) => {
            state.gamePin = action.payload
        },

        setIdentity: (state, action) => {
            state.identity = action.payload
        },

        setIsHost: (state, action) => {
            state.isHost = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSessionId, setIdentity, setIsHost } = sessionSlice.actions

export default sessionSlice.reducer