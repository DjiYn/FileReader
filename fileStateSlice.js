import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const fileStateSlice = createSlice({
    name: 'fileState',
    initialState,
    reducers: {
        setNotActive: (state) => {
            state.map(item => item.active = false)
        },
        loadFile: (state, action) => {
            if (state.length === 0) {
                state.push({
                    name: action.payload,
                    active: true
                })

            } else {
                const index = state.findIndex(item => item.name === action.payload)

                if (index !== -1) {
                    state[index].active = true
                } else {
                    state.push({
                        name: action.payload,
                        active: true
                    })
                }
            }
        }
    }
})

export const { loadFile, setNotActive } = fileStateSlice.actions

export default fileStateSlice.reducer