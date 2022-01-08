import { signInAnonymously } from "firebase/auth";
import React from "react";
import firebase from "../api/firebase";

const UserContext = React.createContext({
  user: null,
});

export const UserProvider = (props) => {
  console.log("hi");
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    (async () => {
      const user = await signInAnonymously(firebase.auth);
      setUser(user);
    })();
  }, []);

  const contextValue = {
    user: user,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
