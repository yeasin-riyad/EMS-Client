import { createSlice } from '@reduxjs/toolkit'

const initialState={
    departments:[],
    loadingDepartments:true
}


export const departmentSlice=createSlice({
    name:'department',
    initialState,
    reducers:{
        setDepartments:(state,action)=>{
            state.departments=[...action.payload]
        },
        setLoadingDepartments:(state,action)=>{
            state.loadingDepartments=action.payload
        }
    }

})


export const { setDepartments,setLoadingDepartments} = departmentSlice.actions
export default departmentSlice.reducer
