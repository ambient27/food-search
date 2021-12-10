import React from "react";
import { useEffect, useState } from "react";
//import Auth from "./components/Auth/Authenticate";
import { Route, Routes } from "react-router-dom";
import NewEntry from "./pages/NewEntry";
import MyTracker from "./pages/MyTracker";
import Layout from "./components/layout/Layout";
import MealPlan from "./pages/MealPlan";
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "@firebase/app";
//import { GoogleAuthProvider } from "firebase/auth";
import SignIn from "./pages/SignIn";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

//import Sublist from "./components/Sublist";
//import SearchForm from './components/NewRosh/SearchForm';

const firebaseConfig = {
  apiKey: "AIzaSyDfQ7Sx5eCoJUKkeW4PHOGXLVquFMwoN5U",
  authDomain: "food-search-app-b90e5.firebaseapp.com",
  projectId: "food-search-app-b90e5",
  storageBucket: "food-search-app-b90e5.appspot.com",
  messagingSenderId: "729844611055",
  appId: "1:729844611055:web:d982ef3ed127615fbe681a",
  measurementId: "G-ZYQS0LY53T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//const credential = GoogleAuthProvider.credential(
// googleUser.getAuthResponse().id_token);

const App = () => {
  const [foodAtePerDate, setFoodAtePerDate] = useState([{calories: 0, date: '' }]);

  const entryHandler = (idx) => {
    const newArray=[...foodAtePerDate, {calories: idx.calories, date: idx.date}];
    setFoodAtePerDate(newArray);
  };

  const deleteHandler = (index) => {
    const newArray = [...foodAtePerDate]
    newArray.splice(index,1);
     setFoodAtePerDate(newArray);
   }

  useEffect(() => {
    (async () => {
      const res = await signInAnonymously(auth);
      console.log(res);
    })();
  }, []);

  

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
        <Route path="/" element={<Layout position="fixed"/>}>
            <Route
              path="newentry"
              element={<NewEntry entryHandler={entryHandler} />}
            >
              {" "}
            </Route>
            <Route
              path="mytracker"
              element={<MyTracker data={foodAtePerDate} deleteHandler={deleteHandler} />}
            ></Route>
            <Route path="mealplan" element={<MealPlan />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
          </Route>
        </Routes>
      </LocalizationProvider>
    </>
  );
};

export default App;
