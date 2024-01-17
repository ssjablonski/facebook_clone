import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import { ThemeProvider } from "context/ThemeContext" 
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar/NavBar";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <ThemeProvider>
      <div className="app">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
