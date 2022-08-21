import { Button, Paper, TextField, Typography } from "@mui/material";

import styles from "./Login.module.scss";

export const Login = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <TextField
        className={styles.field}
        label="E-Mail"
        error
        helperText="invalid e-mail"
        fullWidth
      />
      <TextField className={styles.field} label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Sign in
      </Button>
    </Paper>
  );
};
