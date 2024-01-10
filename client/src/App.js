import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import NavBar from "scenes/navbar/NavBar";
import ProfilPage from "scenes/profilePage/ProfilPage";
import { ThemeProvider } from "context/ThemeContext" 

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
