import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NewEntry from "./pages/NewEntry";
import MyTracker from "./pages/MyTracker";
import Layout from "./components/layout/Layout";
import MealPlan from "./pages/MealPlan";
import SignIn from "./pages/SignIn";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { UserProvider } from "./store/UserContext";

const App = () => {
  const [foodAtePerDate, setFoodAtePerDate] = useState([
    { calories: 0, date: "" },
  ]);

  const entryHandler = (idx) => {
    const newArray = [
      ...foodAtePerDate,
      { calories: idx.calories, date: idx.date },
    ];
    setFoodAtePerDate(newArray);
  };

  const deleteHandler = (index) => {
    const newArray = [...foodAtePerDate];
    newArray.splice(index, 1);
    setFoodAtePerDate(newArray);
  };

  return (
    <UserProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route path="/" element={<Layout position="fixed" />}>
            <Route
              path="newentry"
              element={<NewEntry entryHandler={entryHandler} />}
            >
              {" "}
            </Route>
            <Route
              path="mytracker"
              element={
                <MyTracker
                  data={foodAtePerDate}
                  deleteHandler={deleteHandler}
                />
              }
            ></Route>
            <Route path="mealplan" element={<MealPlan />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
          </Route>
        </Routes>
      </LocalizationProvider>
    </UserProvider>
  );
};

export default App;
