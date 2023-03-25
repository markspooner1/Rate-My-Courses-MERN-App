import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/homePage";
import LoginPage from "./Pages/loginPage";
import Course from "./Pages/coursePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //if token exists, authorized
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element= {isAuth ? <HomePage /> : <Navigate to ="/" />} />
            <Route
              path="/course/:courseId"
              element={isAuth ? <Course /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;