import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import departmentReducer from './departmentSlice.js'
import employeeReducer from './employeeSlice.js'


export const store=configureStore({
    reducer:{
        user:userReducer,
        department:departmentReducer,
        employee:employeeReducer

    }
})