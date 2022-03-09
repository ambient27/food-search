import { signInAnonymously } from "firebase/auth";
import React from "react";
import firebase from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserContext = React.createContext({
  user: null,
  signedIn: false,
});

export const UserProvider = (props) => {
  console.log("userprovidercall");
  const [user, setUser] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);
  const [calGoal, setCalGoal] = React.useState(2000);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user == null) {
      (async () => {
        const user = await signInAnonymously(firebase.auth);

        setUser(user.user.uid);
      })();
    }
  }, [user]);

  const setUserValue = (props) => {
    setUser(props);
    setSignedIn(true);
    findCalGoal(props);
  };

  const setCalorieGoal = (props) => {
    setCalGoal(props);
  };

  const findCalGoal = (props) => {
    const caloriesRef = collection(firebase.db, "calorie-goals");
    const fetchedEntries = [];

    const fetchData = async () => {
      const q = query(caloriesRef, where("uid", "==", props.uid));
      const docs = await getDocs(q);
      docs.forEach((doc) => {
        fetchedEntries.push({ data: doc.data(), id: doc.id });
      });
      console.log(fetchedEntries);
      const correctArrayNumber = fetchedEntries.length - 1;
      setCalGoal(fetchedEntries[correctArrayNumber].data.calorieGoal);
    };
    fetchData();
  };

  const signout = () => {
    setUser(user.uid);
    setSignedIn(false);
    navigate("/newentry");
  };

  const contextValue = {
    user: user,
    setUserValue: setUserValue,
    signedIn: signedIn,
    signout: signout,
    calGoal: calGoal,
    setCalorieGoal: setCalorieGoal,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
