import { ThemeContext } from 'context/ThemeContext';
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'reducer';
import Post from './Post';

function FeedPosts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const { mode, setMode } = useContext(ThemeContext);

    async function getPosts() {
        const fetchPosts = await fetch(`http://localhost:3001/posts/${user._id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await fetchPosts.json();
        // console.log(data)
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        getPosts();
    }, [])
    

    return (
        <>
        {posts.map((post) => <Post key={post._id} info={post} />)}
        </>
    )
}

export default FeedPosts