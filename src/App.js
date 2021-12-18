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
      main: "#C06F35",
      fontFamily: ["Roboto", "sans-serif"],
      contrastText: "black",
    },
  },
  typography: {
    primary: {},
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
      fontFamily: ["Roboto", "sans-serif"],
      fontSize: 20,
      fontWeight: 600,
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
