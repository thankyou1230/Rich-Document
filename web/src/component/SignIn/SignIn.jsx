import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../../firebase";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Icon from "@iconify/react";
import googleIcon from "@iconify-icons/grommet-icons/google";
import firebase from "firebase/app";
import document from "../../img/document.png";
import signin from "../../img/signin.png";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Authentication/Authentication";
import Avatar from "@material-ui/core/Avatar";
import "firebase/auth";
import "./SignIn.css";

const SignIn = () => {
  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      fontFamily: '"Tempus Sans ITC"',
    },
  });

  const classes = useStyles();

  const onSubmit = (e) => {
    //sign in with Rich Document account
    e.preventDefault();
    const { email, password } = e.target.elements;
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((error) => {
        alert(error);
      });
  };

  const onSignInWithGoogle = () => {
    //sign in with Google account
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setIsNewUser(result.additionalUserInfo.isNewUser);
        console.log(result.credential.accessToken);
      });
    return;
  };

  const { currentUser } = useContext(AuthContext);
  const [isNewUser, setIsNewUser] = useState(null);

  if (currentUser && !isNewUser) {
    //redirect to dashboard if user logged in
    return <Redirect to="/dashboard" />;
  }

  // if (isNewUser) {
  //   //redirect to privacy if the user is new
  //   return <Redirect to="/privacy" />;
  // }

  return (
    <>
      <div className="center-vertical">
        <div className="center-horizontal">
          <img src={document} height="100" width="100" />
        </div>
        <div className="spacer"></div>
        <div className="center-horizontal">
          <Button
            className={classes.button}
            variant="outlined"
            onClick={onSignInWithGoogle}
          >
            <Icon icon={googleIcon} className="google" /> Continue with Google
            Account
          </Button>
        </div>
        <div className="spacer"></div>
        <div className="center-horizontal">
          <Avatar src={signin} />
        </div>
        <div className="spacer"></div>
        <form className="form" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
          />
          <Grid container>
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={<span className="rememberme">Remember Me</span>}
              />
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
