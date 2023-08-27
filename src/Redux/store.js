import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../Redux/sessionSlice'

export default configureStore({
    reducer: {
        session: sessionReducer,
    },
})