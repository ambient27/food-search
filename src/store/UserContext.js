import { signInAnonymously } from "firebase/auth";
import React from "react";
import firebase from "../api/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  linkWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext({
  user: null,
  googleUser: null,
});

const provider = new GoogleAuthProvider();

export const UserProvider = (props) => {
  const [user, setUser] = React.useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;
        console.log(googleUser);
        console.log(googleUser.email);

        linkWithCredential(auth.currentUser, credential)
          .then((usercred) => {
            const newGoogleUser = usercred.user;
            console.log(
              "Anonymous account successfully upgraded",
              newGoogleUser
            );
          })
          .catch((error) => {
            console.log("Error upgrading anonymous account", error);
          });

        navigate("/newentry");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  React.useEffect(() => {
    (async () => {
      const user = await signInAnonymously(firebase.auth);
      setUser(user);
    })();
  }, []);

  return (
    <UserContext.Provider handleSubmit={handleSubmit} value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
