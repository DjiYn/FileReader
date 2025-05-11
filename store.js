import { configureStore } from "@reduxjs/toolkit"
import fileStateReducer from './fileStateSlice.js'

export const store = configureStore({
    reducer: {
        fileState: fileStateReducer
    },
})