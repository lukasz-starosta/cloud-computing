import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { DatePicker } from "@material-ui/pickers";
import database from "../api/database";

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
    passwordConfirm: "",
    birthDate: new Date(),
    name: "",
    surname: ""
  });

  const classes = useStyles();
  const profilePicture = "https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png";
  const backgroundPicture= "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  const handleRegistration = () => {
    const createUser = async user => {
      await database.setUser({
        uid: user.uid,
        email: data.email,
        name: data.name,
        surname: data.surname,
        birthDate: data.birthDate,
        profilePicture: profilePicture,
        backgroundPicture: backgroundPicture,
      });
    };

    if (data.password === data.passwordConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(result => {
          createUser(result.user);
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
          type="email"
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
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Name"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, name: event.target.value };
            });
          }}
        />
        <TextField
          className={classes.field}
          required
          variant="outlined"
          label="Surname"
          onChange={event => {
            event.persist();
            setData(rest => {
              return { ...rest, surname: event.target.value };
            });
          }}
        />
        <DatePicker
          required
          className={classes.field}
          variant="inline"
          inputVariant="outlined"
          label="Birth date"
          value={data.birthDate}
          onChange={date => {
            setData(rest => {
              return { ...rest, birthDate: date };
            });
          }}
          format="MM/dd/yyyy"
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
