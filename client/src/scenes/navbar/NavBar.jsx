import React, {useContext} from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeContext } from 'context/ThemeContext';
import { setLogout } from 'reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';


function NavBar() {
  const { mode, setMode, paleta } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);


  return (
    <div className={`flex justify-between items-center  text-black text-xl font-bold ${paleta.primary} ${paleta.text}`}>
      <button className='p-4' onClick={() => navigate('/home')}>Stronka</button>
      <div className='flex'>
        <button className={`rounded-xl ${paleta.color} text-black p-3 m-1`} onClick={
          () => {
            setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
          }
        
        }>
          {mode==="light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
        {location.pathname !== '/' ?
          <div>
            <button className={`rounded-xl ${paleta.color} text-black p-3 m-1`} onClick={
              () => {
                dispatch(setLogout());
                navigate('/');
              }
            }>
              <LogoutIcon />
            </button>
          </div>
        : null}
      </div>
    </div>
  )
}

export default NavBar