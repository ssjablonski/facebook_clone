import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        posts:[],
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriend: (state, action) => {
            if (state.user) {
                state.user.friends.push(action.payload);
            } else {
                console.log("user not found");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const newPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                } else {
                    return post;
                }
            });
            state.posts = newPosts;
        } ,
    },
});

export const { setMode, setLogin, updateUser, setLogout, setFriend, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;