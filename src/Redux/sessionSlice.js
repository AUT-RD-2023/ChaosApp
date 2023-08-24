import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        gamePin: "",
        playerId: "",
        nickname: "",
        isHost: false,
        settingsOpen: false,
        defaultNumRounds: 2,
        defaultResponseTime: "1:00",
        defaultDiscussionTime: "2:00"
    },
    reducers: {
        setSessionId: (state, action) => {
            state.gamePin = action.payload
        },

        setPlayerId: (state, action) => {
            state.playerId = action.payload
        },

        setName: (state, action) => {
            state.nickname = action.payload
        },

        setIsHost: (state, action) => {
            state.isHost = action.payload
        },

        setSettingsOpen: (state, action) => {
            state.settingsOpen = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSessionId, setPlayerId, setName, setIsHost, setSettingsOpen } = sessionSlice.actions

export default sessionSlice.reducer