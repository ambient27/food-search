import { signInAnonymously } from "firebase/auth";
import React from "react";
import firebase from "../api/firebase";

const UserContext = React.createContext({
  user: null,
});

export const UserProvider = (props) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    (async () => {
      const user = await signInAnonymously(firebase.auth);
      setUser(user);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
