import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const theme = createMuiTheme({
  pallete: {
    primary: "#525151"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(5, 3)
  }
}));

const User = props => {
  const deleteUser = () => {
    axios
      .delete(`http://localhost:5000/users/${props.user.id}`, props.user.id)
      .then(response => {
        console.log("Deleted", response);
        props.setUsers(props.users.filter(user => user.id !== props.user.id));
      })
      .catch(error => {
        console.log("Delete Error", error);
      });
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Paper className={classes.root} color="primary">
          <Typography variant="h5" component="h5">
            {props.name}
          </Typography>
          <Typography component="p">{props.bio}</Typography>
          <IconButton
            aria-label="delete"
            onClick={e => {
              e.preventDefault(); deleteUser(props.user.id);
            }}
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default User;
