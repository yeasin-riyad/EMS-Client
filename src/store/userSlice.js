import { createSlice } from '@reduxjs/toolkit'

const initialValue={
    _id:"",
    name:"",
    email:"",
    profileImage:"",
    address_details:[],
    createdAt:"",
    last_login_date:"",
    mobile:"",
    role:"",
    verified:"",
}

export const userSlice = createSlice({
    name: 'user',
    initialState:initialValue,
    reducers: {
        setUser: (state, action) => {
            state.name=action.payload?.name;
            state.email=action.payload?.email;
            state._id=action.payload?._id;
            state.profileImage=action.payload?.profileImage;
            state.address_details=action.payload?.address_details;
            state.createdAt=action.payload?.createdAt;
            state.last_login_date=action.payload?.last_login_date;
            state.mobile=action.payload?.mobile;
            state.role=action.payload?.role;
            state.verified=action.payload?.verified;
            
              
        },
        updateProfileImage:(state, action)=>{
            state.profileImage=action.payload
        },

        logout: (state) => {
            state._id=""
            state.name=""
            state.email=""
            state.avatar=""
            state.address_details=[]
            state.createdAt=""
            state.last_logit_date=""
            state.mobile=""
            state.role=""
            state.status=""
            state.verified=""
            state.orderHistory=[]
            state.shopping_cart=[]
        },
       
    },
})

export const { setUser,logout,updateProfileImage } = userSlice.actions

export default userSlice.reducer