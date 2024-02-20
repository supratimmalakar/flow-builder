import { createSlice } from '@reduxjs/toolkit'

export const flowBuilderSlice = createSlice({
    name: 'flowBuilder',
    initialState: {
        selectedNodes: [],
        setNodes: (_) => {},
    },
    reducers: {
        setSelectedNodes: (state, action) => {
            const { payload } = action;
            state.selectedNodes = payload;
        },
        createSetNodesInstance: (state, action) => {
            const {payload} = action;
            state.setNodes = payload;
        }
    }
})

export const {
    setSelectedNodes,
    createSetNodesInstance,
} = flowBuilderSlice.actions

export default flowBuilderSlice.reducer