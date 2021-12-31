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
import WeeklyGoal from "./pages/WeeklyGoal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fcd900",
      contrastText: "#5c2e85",
    },
    secondary: {
      main: "#5c2e85",
    },
    background: {},
  },

  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    htmlFontSize: 10,
    primary: {
      color: "#5c2e85",
    },
    secondary: {
      fontFamily: ["Roboto", "sans-serif"],
      color: "black",
      fontSize: 25,
    },
    smallertext: {
      fontFamily: ["Roboto", "sans-serif"],
      color: "#5c2e85",
      fontSize: 20,
      fontWeight: 600,
    },
    logo: {
      fontFamily: "Open-Sans",
      color: "#5c2e85",
      fontSize: 35,
      fontWeight: 600,
      marginLeft: "5px",
    },
    button: {
      fontSize: 22,
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
                <Route
                  path="weeklygoal"
                  element={<WeeklyGoal calGoal={calGoal} />}
                ></Route>
              </Route>
            </Routes>
          </LocalizationProvider>
        </ThemeProvider>
      </UserProvider>
    </>
  );
};

export default App;
