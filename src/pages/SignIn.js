import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  linkWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ErwinPwnsNoobs.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn(props) {
  const userCtx = React.useContext(UserContext);
  const navigate = useNavigate();
  const [googleUser, setGoogleUser] = React.useState([]);
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    (async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;
        console.log(googleUser);
        console.log(googleUser.email);
        console.log(token);
        console.log(credential);
        setGoogleUser(googleUser);

        //const credential = GoogleAuthProvider.credential(
        //  googleUser.getAuthResponse().id_token
        //);
        console.log(auth.currentUser);
        linkWithCredential(auth.currentUser, credential)
          .then((usercred) => {
            const newGoogleUser = usercred.user;

            console.log(
              "Anonymous account successfully upgraded",
              newGoogleUser
            );
          })
          .catch((error) => {
            console.log(auth.currentUser);
            userCtx.setUserValue(auth.currentUser);
            setUserId(auth.currentUser.uid);
            console.log("Error upgrading anonymous account", error);
            navigate("/newentry");
            alert("Signed in success");
          });
      });
    })();
  }, []);

  const loginHandler = () => {
    console.log("loginhandler");
    //eslint-disable-next-line no-console
    const auth = getAuth();

    // });
    // console.log(googleUser);
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="smallertext">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <Button onClick={loginHandler} fullWidth variant="contained">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: "black" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" sx={{ color: "black" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
