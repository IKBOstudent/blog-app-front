import React from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Alert, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";

import validator from "validator";
import { fetchAuthLogin } from "../../redux/slices/AuthSlice";

import styles from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";

export const Login = () => {
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
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async values => {
        try {
            setLoading(true);
            const data = await dispatch(fetchAuthLogin(values));

            if (!data.payload) {
                setError({ name: "Invalid credentials", status: true });
                return;
            }

            if ("token" in data.payload) {
                window.localStorage.setItem("token", data.payload.token);
            } else {
                alert("Server Error! JWT Token porblem");
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
                Login
            </Typography>

            {error.status && (
                <Alert severity="error" style={{ marginBottom: "30px" }}>
                    {error.name}
                </Alert>
            )}

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
                            isEmail: value => validator.isEmail(value) || "Invalid email",
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
                <Button disabled={!isValid || isLoading} type="submit" size="large" variant="contained" fullWidth>
                    Sign in
                    {isLoading && <CircularProgress color="secondary" className={styles.loader} />}
                </Button>
            </form>
        </Paper>
    );
};
