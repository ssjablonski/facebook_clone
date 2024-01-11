import ProfilePanel from 'components/ProfilePanel';
import React, {useContext, useState} from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'context/ThemeContext';
import NavBar from 'scenes/navbar/NavBar';
import FeedPosts from 'components/FeedPosts';
import { Navigate } from 'react-router-dom';
import CreatePost from 'components/CreatePost';

function HomePage() {
  const user = useSelector((state) => state.user);
  const { mode, setMode } = useContext(ThemeContext);
  const [render, setRender] = useState(true);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="text-slate-800 size-xl mx-96">
      <div className="flex mx-20 mt-10">
        <div className="w-1/4">
          <ProfilePanel />
        </div>
        <div className="w-3/4">
          <CreatePost info={[render, setRender]}/>
          <FeedPosts info={[render, setRender]}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage