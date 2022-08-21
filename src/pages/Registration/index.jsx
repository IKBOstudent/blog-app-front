import React from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";

import styles from "./Registration.module.scss";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthRegister } from "../../redux/slices/AuthSlice";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.AuthReducer.data));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const response = await dispatch(fetchAuthRegister(values));
    // console.log(response);

    if (!response.payload) {
      return alert("Registration failed :(");
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
        Registration
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", {
            required: "Enter your full name",
            minLength: {
              value: 3,
              message: "Too short full name",
            },
          })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
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
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Enter your password",
            minLength: {
              value: 5,
              message: "Too short password",
            },
          })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
