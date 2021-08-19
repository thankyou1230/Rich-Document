import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import signup from "../../img/signup.png";
import "firebase/firestore";
import "./SignUp.css";

var elements = null;
const SignUp = () => {
  const [formSubmitted, setFormSubmitted] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    elements = e.target.elements; //store submitted form datas
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return <Redirect to="/privacy" />;
  }

  return (
    <>
      <div className="center-vertical">
        <div className="center-horizontal">
          <img src={signup} height="100" width="100" />
          <p className="title">Create a Rich Document account</p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
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
          <div class="spacer"></div>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Next Step
          </Button>
        </form>
      </div>
    </>
  );
};

export { SignUp, elements };
