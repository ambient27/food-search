import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NewEntry from "./pages/NewEntry";
import MyTracker from "./pages/MyTracker";
import Layout from "./components/layout/Layout";
import MealPlan from "./pages/MealPlan";
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./store/UserContext";


const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
  typography: {
    primary: {
      fontFamily: "Roboto",
      color: "black",
    },
  },

});

const App = () => {
    return (
    <>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Routes>
              <Route path="/" element={<Layout position="fixed" />}>
                <Route
                  path="newentry"
                  element={<NewEntry/>}
                >
                </Route>
                <Route path="mytracker" element={<MyTracker />}></Route>
                <Route path="mealplan" element={<MealPlan />}></Route>
                <Route path="signin" element={<SignIn />}></Route>
              </Route>
            </Routes>
          </LocalizationProvider>
        </ThemeProvider>
      </UserProvider>
    </>
  );
};

export default App;
