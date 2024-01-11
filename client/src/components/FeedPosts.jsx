import { ThemeContext } from 'context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'reducer';
import Post from './Post';
import { useLocation } from 'react-router-dom';

function FeedPosts({info}) {
    const [render, setRender] = info
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const { mode, setMode } = useContext(ThemeContext);
    

    async function getPosts() {
        const fetchPosts = await fetch(`http://localhost:3001/posts/${user._id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await fetchPosts.json();
        dispatch(setPosts({ posts: data }));
    }

    async function getUserPosts() {
        const response = await fetch(
            `http://localhost:3001/posts/${user._id}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            const data = await response.json();
            dispatch(setPosts({ posts: data }));
            console.log(posts)
        };
    

    useEffect(() => {
        if (location.pathname === '/home') {
            if (render) {
                getPosts();
                setRender(false);
            }
        } else {
            if (render) {
                getUserPosts();
                setRender(false);
            }
        }
    }, [render]) // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <>
            {posts && posts.map((post) => <Post key={post._id} info={post} how={[render, setRender]} />)}
        </>
        
    )
}

export default FeedPosts