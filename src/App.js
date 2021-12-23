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
import Goals from "./pages/Goals";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4FBA52",
      contrastText: "black",
    },
    secondary: {
      main: "#6A5B6E",
    },
    background: {},
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    primary: {
      fontSize: 35,
    },
    secondary: {
      fontFamily: ["Roboto", "sans-serif"],
      color: "black",
      fontSize: 25,
      fontWeight: 600,
    },
    smallertext: {
      fontFamily: ["Roboto", "sans-serif"],
      color: "black",
      fontSize: 20,
      fontWeight: 600,
    },
    button: {
      fontSize: 20,
      fontWeight: 600,
      backgroundColor: "#4FBA52",
      "&:hover": {
        background: "#9F5C2D",
      },
    },
  },
});

const App = () => {
  const [calGoal, setCalGoal] = React.useState(2000);

  return (
    <>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Routes>
              <Route path="/" element={<Layout position="fixed" />}>
                <Route
                  path="newentry"
                  element={<NewEntry theme={theme} />}
                ></Route>
                <Route
                  path="mytracker"
                  element={<MyTracker calGoal={calGoal} />}
                ></Route>
                <Route path="mealplan" element={<MealPlan />}></Route>
                <Route
                  path="goals"
                  element={<Goals setCalGoal={setCalGoal} />}
                ></Route>
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
