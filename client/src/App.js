import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import { ThemeProvider } from "context/ThemeContext"
import { NotificationsProvider } from "context/NotificationsContext"  
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar/NavBar";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <ThemeProvider>
      <NotificationsProvider>
        <div className="app">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
