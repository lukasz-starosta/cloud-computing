import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 10,
    width: "60%",
    textAlign: "center"
  },
  field: {
    marginBottom: theme.spacing(2)
  }
}));

const Login = ({ history }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const classes = useStyles();

  const handleRegistration = () => {
    if (data.password === data.passwordConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          history.push("/dashboard");
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  const handleLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h3>Log in</h3>
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Email"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, email: event.target.value };
            });
          }}
        />
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Password"
          type="password"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, password: event.target.value };
            });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogIn}
        >
          Log in
        </Button>
      </div>
      <div className={classes.form}>
        <h3>Create a new account</h3>
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Email"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, email: event.target.value };
            });
          }}
        />
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Password"
          type="password"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, password: event.target.value };
            });
          }}
        />
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Password Confirmation"
          type="password"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, passwordConfirm: event.target.value };
            });
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleRegistration}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Login);
