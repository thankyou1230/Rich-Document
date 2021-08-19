import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { elements } from "../SignUp/SignUp";
import firebase from "firebase/app";
import firebaseConfig from "../../firebase";
import privacy from "../../img/privacy.png";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Authentication/Authentication";
import "./Privacy.css";

const Privacy = () => {
  const { currentUser } = useContext(AuthContext);
  const [showText, setShowText] = useState("Show More");

  const showChange = () => {
    //change display status and text of show button
    if (showText == "Show More") {
      setShowText("Show Less");
      document.getElementById("show-more1").style.display = "block";
      document.getElementById("show-more2").style.display = "block";
    } else {
      setShowText("Show More");
      document.getElementById("show-more1").style.display = "none";
      document.getElementById("show-more2").style.display = "none";
    }
  };

  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      fontFamily: '"Tempus Sans ITC"',
      fontStyle: "italic",
    },
  });

  const classes = useStyles();

  const onAccept = () => {
    const { firstname, lastname, dateofbirth, email, password } = elements;
    firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value) //create user with email & password
      .then(() => {
        firebaseConfig
          .auth()
          .signInWithEmailAndPassword(email.value, password.value) //sign in
          .then(() => {
            var database = firebase.firestore(firebaseConfig);
            database //write user information to Firebase Cloud Firestore
              .collection("User")
              .doc(email.value)
              .set({
                dateofbirth: dateofbirth.value,
                email: email.value,
                firstname: firstname.value,
                lastname: lastname.value,
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (currentUser) {
    //redirect to dashboard if user logged in
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div className="center-vertical">
        <div className="center-horizontal">
          <img src={privacy} height="100" width="100" />
          <p className="title">Complete your registration</p>
        </div>
        <Card>
          <CardContent>
            <div className="center-horizontal">
              <p className="header">Our Privacy Policy</p>
            </div>
            <Divider light />
            <p className="content">
              This is the privacy policy for Rich Document applications. Some of
              our other sites and services have their own policies, and there is
              more about how to find these below.
            </p>
            <p className="content">
              Everything that we do is guided by our values - including our
              editorial approach and how we use data.
            </p>
            <p className="content">
              We use your personal data for many reasons, from understanding how
              our users engage with our journalism to informing our marketing
              and advertising. Ultimately, this allows us to publish the
              journalism that you read on our sites and apps.
            </p>
            <p className="showmore" id="show-more1">
              These are the main reasons why we collect and use data about our
              users:
            </p>
            <div className="bullet" id="show-more2">
              <li>
                To Show you journalism that is relevant to you and to improve
                your experience on our site.
              </li>
              <li>
                To provide the services you sign up for, such as subscriptions.
              </li>
              <li>
                To carry out marketing analysis and send you communications when
                we have your permission, or when permitted by law.
              </li>
              <li>To enable us to show advertising on our sites.</li>
            </div>
          </CardContent>
          <CardActions>
            <Button className={classes.button} onClick={showChange}>
              {showText}
            </Button>
          </CardActions>
        </Card>
        <Button
          onClick={onAccept}
          fullWidth
          variant="contained"
          color="primary"
        >
          Accept and Finish
        </Button>
      </div>
    </>
  );
};

export default Privacy;
