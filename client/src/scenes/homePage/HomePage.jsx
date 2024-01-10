import ProfilePanel from 'components/ProfilePanel';
import React, {useContext} from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'context/ThemeContext';
import NavBar from 'scenes/navbar/NavBar';
import FeedPosts from 'components/FeedPosts';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const user = useSelector((state) => state.user);
  const { mode, setMode } = useContext(ThemeContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="text-slate-800 size-xl">
      <p>Hej, {user.firstName}! </p>
      <p>Mode: {mode}</p>
      <div className="flex">
        <div className="w-1/6">
          <ProfilePanel />
        </div>
        <div className="w-5/6">
          <FeedPosts />
        </div>
      </div>
    </div>
  );
}

export default HomePage