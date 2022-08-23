import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import validator from "validator";
import { fetchAuthLogin } from "../../redux/slices/AuthSlice";

import styles from "./Login.module.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.AuthReducer.data));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const response = await dispatch(fetchAuthLogin(values));

    if (!response.payload) {
      return alert("Sign in failed :(");
    }

    if ("token" in response.payload.data) {
      window.localStorage.setItem("token", response.payload.data.token);
    } else {
      alert("Token porblem");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register("email", {
            required: "Enter your email",
            validate: {
              isEmail: (value) => validator.isEmail(value) || "Invalid email",
            },
          })}
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register("password", {
            required: "Enter your password",
          })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Sign in
        </Button>
      </form>
    </Paper>
  );
};
