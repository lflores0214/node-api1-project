import React, { useState, useEffect } from "react";
import axios from "axios";

import User from "./User";
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import { NavLink } from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState([]);
  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log("Get Users Error", error);
      });
  }, []);

  return (
    <div>
        <Button variant="contained" color="primary" className={classes.root} >Add a user </Button>
      {users.map(user => {
        return (
            // <NavLink to={`/users/${user.id}`} >
          <User
            key={user.id}
            name={user.name}
            bio={user.bio}
            setUsers={setUsers}
            users={users}
            user={user}
          />
        //   </NavLink>
        );
      })}
    </div>
  );
};

export default Users;
