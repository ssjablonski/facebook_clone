import React, {useContext, useState} from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeContext } from 'context/ThemeContext';
import { setLogout } from 'reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookie } from '@mui/icons-material';
import Cookies from 'js-cookie';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notifications from 'components/Notifications';

function NavBar() {
  const { paleta, setRender } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const theme = Cookies.get('theme');
  const [display, setDisplay] = useState(false);
  


  return (
    <div className={`flex justify-between items-center text-xl font-bold ${paleta.primary} ${paleta.text} `}>
      <button className='p-6' onClick={() => navigate('/home')}>Stronka</button>
      <div className='flex'>
        <button className={`rounded-xl ${paleta.color} text-black p-3 m-1`} onClick={
          () => {
            const oldTheme = Cookies.get('theme');
            console.log(oldTheme)
            if (oldTheme === 'light') {
              Cookies.set('theme', 'dark');
              setRender(true);
            } else {
              Cookies.set('theme', 'light');
              setRender(true);
            }
          }

        
        }>
          {theme ==="light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
        {location.pathname !== '/' ?
          <div>
            <button className={`rounded-xl ${paleta.color} text-black p-3 m-1`} onClick={
              () => {
                setDisplay((prev) => !prev);
              }
            }>
              {display ? <NotificationsIcon /> : <NotificationsNoneIcon />}
            </button>
            
            <button className={`rounded-xl ${paleta.color} text-black p-3 m-1`} onClick={
              () => {
                dispatch(setLogout());
                navigate('/');
              }
            }>
              <LogoutIcon />
            </button>
            {display ? <Notifications /> : null}
          </div>
        : null}
      </div>
    </div>
  )
}

export default NavBar