import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { genericsType, InitialStateInterface, Post, User } from "../Types";

const initialState:InitialStateInterface = {
    token: window.localStorage.getItem("blog-site-token") ? window.localStorage.getItem("blog-site-token"): null,
    user: window.localStorage.getItem("blog-site-user") ? JSON.parse(window.localStorage.getItem("blog-site-user")!): null,
    posts: []
}
export const slice = createSlice({
    name: "blog-site",
    initialState,
    reducers : {
        setToken(state, action:PayloadAction<genericsType<string>>){
            try{
                if(action.payload){
                    state.token = action.payload
                    window.localStorage.setItem("blog-site-token", state.token)
                }else{
                    window.localStorage.removeItem("blog-site-token")
                }
            }catch(error){
                console.log(error)
            }
        },
        setUser(state, action:PayloadAction<genericsType<User>>){
            try{
                if(action.payload){
                    state.user = action.payload
                    window.localStorage.setItem("blog-site-user", JSON.stringify(state.user))
                }else{
                    window.localStorage.removeItem("blog-site-user")
                }
            }catch(error){
                console.log(error)
            }
        },
        setPosts(state, action:PayloadAction<Post[]>){
            state.posts = action.payload
        }
    }
})
export const Reducer = slice.reducer;
export const {setToken, setUser, setPosts} = slice.actions