import { configureStore } from '@reduxjs/toolkit'
import flowBuilderReducer from './reducer'

export default configureStore({
    reducer: {
        flowBuilder: flowBuilderReducer,
    }
})