import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    ablyUsers: [],

    scenario: "",
    customScenario: null,
    useCustomScenario: false,
    chaos: "default value",
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
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

        setAblyUsers: (state, action) => {
            state.ablyUsers.push(action.payload)
        },

        resetDefaults: () => {
            return initialState;
        },

        resetAbly: (state) => {
            state.ablyUsers = [];
        },

        setScenario: (state, action) => {
            state.scenario = action.payload
        },

        setCustomScenario: (state, action) => {
            state.customScenario = action.payload
        },

        setUseCustomScenario: (state, action) => {
            state.useCustomScenario = action.payload
        },

        setChaos: (state, action) => {
            state.chaos = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSessionId, setPlayerId, setName, setIsHost, setRound, setActivity, setSettingsOpen, setSavePressed, setNumRounds, setAblyUsers, resetDefaults, resetAbly, 
               setScenario, setCustomScenario, setUseCustomScenario, setChaos } = sessionSlice.actions

export default sessionSlice.reducer