import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        gamePin: "",
        playerId: "",
        nickname: "",
        isHost: false,
        round: 1,
        activity: "",
        settingsOpen: false,
        savePressed: false,
        defaultNumRounds: 2,
        defaultResponseTime: 60,
        defaultDiscussionTime: 120,
        numRounds: 2,
        numPlayers: 0,
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

        setRound: (state, action) => {
            state.round = action.payload
        },

        setActivity: (state, action) => {
            state.activity = action.payload
        },

        setSettingsOpen: (state, action) => {
            state.settingsOpen = action.payload
        },

        setSavePressed: (state, action) => {
            state.savePressed = action.payload
        },

        setNumRounds: (state, action) => {
            state.numRounds = action.payload
        },

        setNumPlayers: (state, action) => {
            state.numPlayers = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSessionId, setPlayerId, setName, setIsHost, setRound, setActivity, setSettingsOpen, setSavePressed, setNumRounds, setNumPlayers } = sessionSlice.actions

export default sessionSlice.reducer