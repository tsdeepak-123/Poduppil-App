import { createSlice } from "@reduxjs/toolkit";
const AdminAuth = createSlice({
    name:"Admin",
    initialState:{
        AdminToken:null,
    },
    reducers:{
        AddAdmin(state,action){
            const newItem = action.payload;
            state.AdminToken = newItem.token
        },
        AdminLogout(state,actions){
            state.AdminToken =""    
        }
    }
})
export const AdminAction = AdminAuth.actions
export default AdminAuth