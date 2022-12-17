import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";

import { Alert, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";

import styles from "./Registration.module.scss";

import { fetchAuthRegister } from "redux/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "hooks";

export const Registration = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => Boolean(state.AuthReducer.data));

    const [error, setError] = React.useState({ name: "", status: false });

    const [isLoading, setLoading] = React.useState(false);

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

    const onSubmit = async values => {
        try {
            setLoading(true);
            const response = await dispatch(fetchAuthRegister(values));

            if (!response.payload) {
                setError({ name: "Invalid credentials", status: true });
                return alert("Registration failed :(");
            }

            if ("token" in response.payload) {
                window.localStorage.setItem("token", response.payload.token);
            } else {
                alert("Token porblem");
            }
        } catch (err) {
            console.warn(err);
            alert(err);
        } finally {
            setLoading(false);
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

            {error.status && (
                <Alert severity="error" style={{ marginBottom: "30px" }}>
                    {error.name}
                </Alert>
            )}

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
                            isEmail: value => validator.isEmail(value) || "Invalid email",
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
                <Button disabled={!isValid || isLoading} type="submit" size="large" variant="contained" fullWidth>
                    Sign up
                    {isLoading && <CircularProgress color="secondary" className={styles.loader} />}
                </Button>
            </form>
        </Paper>
    );
};
