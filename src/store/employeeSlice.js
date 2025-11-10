import { createSlice } from '@reduxjs/toolkit'

const initialState={
    employees:[],
    loadingEmployees:true
}


export const employeeSlice=createSlice({
    name:'employee',
    initialState,
    reducers:{
        setEmployees:(state,action)=>{
            state.employees=[...action.payload]
        },
        setLoadingEmployees:(state,action)=>{
            state.loadingEmployees=action.payload
        }
    }

})


export const { setEmployees,setLoadingEmployees} = employeeSlice.actions
export default employeeSlice.reducer
