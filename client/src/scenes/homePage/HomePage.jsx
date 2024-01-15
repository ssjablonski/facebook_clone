import ProfilePanel from 'components/ProfilePanel';
import React, {useContext, useState} from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'context/ThemeContext';
import FeedPosts from 'components/FeedPosts';
import { Navigate } from 'react-router-dom';
import CreatePost from 'components/CreatePost';
import FriendsList from 'components/FriendsList';

function HomePage() {
  const user = useSelector((state) => state.user);
  const { paleta } = useContext(ThemeContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`${paleta.background} size-xl px-48`}>
      <div className="flex px-20 pt-10 ">
        <div className="w-1/6">
          <ProfilePanel />
        </div>
        <div className="w-3/6">
          <CreatePost />
          <FeedPosts />
        </div>
        <div className="w-2/6">
          <FriendsList />
        </div>
      </div>
    </div>
  );
}

export default HomePage