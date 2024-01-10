import ProfilePanel from 'components/ProfilePanel';
import React, {useContext} from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'context/ThemeContext';
import NavBar from 'scenes/navbar/NavBar';
import FeedPosts from 'components/FeedPosts';

function HomePage() {
  const user = useSelector((state) => state.user);
  const { mode, setMode } = useContext(ThemeContext);

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