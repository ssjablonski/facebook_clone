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
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("user not found");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            state.posts = state.posts.map((post) =>
                post && post._id === action.payload._id ? action.payload : post
            );
        },
        deletePost: (state, action) => {
            const newPosts = state.posts.filter(
                (post) => post._id !== action.payload.id
            );
            state.posts = newPosts;
        }
    },
});

export const { setLogin, updateUser, setLogout, setFriends, setPosts, setPost, deletePost } = authSlice.actions;
export default authSlice.reducer;