import React from "react";
import { Route, Routes } from "react-router-dom";
import NewEntry from "./pages/NewEntry";
import MyTracker from "./pages/MyTracker";
import Layout from "./components/layout/Layout";
import MealPlan from "./pages/MealPlan";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./store/UserContext";


const theme = createTheme({
  palette: {
    primary: {
      main: "#9F5C2D",
      fontFamily: "Roboto",
    },
  },
  typography: {
      primary: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: 25,
      fontWeight: 700,
    },
    secondary: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: 20,
      fontWeight: 600,
    },
    smallertext: {
      fontFamily: "Roboto",
      color: "white",
      fontSize: 18,
      fontWeight: 700,
    },
    button:{
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 700,
    }, 
    textfield:{
      fontFamily: "Roboto",
      fontSize: 25,
      fontWeight: 700,
    }
  },
components:{
  textfield:{
    styleOverrides: {
      root: {
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: 700,
    }}
  }}

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
