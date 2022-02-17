import { signInAnonymously } from "firebase/auth";
import React from "react";
import firebase from "../api/firebase";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext({
  user: null,
});

export const UserProvider = (props) => {
  console.log("userprovidercall");
  const [user, setUser] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);
  const navigate = useNavigate();
  console.log(user);

  React.useEffect(() => {
    if (user == null) {
      (async () => {
        const user = await signInAnonymously(firebase.auth);

        setUser(user.user.uid);
      })();
    }
  }, []);

  const setUserValue = (props) => {
    setUser(props);
    setSignedIn(true);
  };

  const signout = () => {
    console.log(user.uid);
    setUser(user.uid);
    setSignedIn(false);

    navigate("/newentry");
  };

  const contextValue = {
    user: user,
    setUserValue: setUserValue,
    signedIn: signedIn,
    signout: signout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
