import React from "react";
import { Link } from "react-router-dom";

import { Button, Container, Dialog, DialogActions, DialogContent, IconButton, Skeleton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./Header.module.scss";

import { TagContext } from "../../App";

import { logout } from "../../redux/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "hooks";

export const Header = () => {
    const dispatch = useAppDispatch();

    const auth_status = useAppSelector(state => state.AuthReducer.status);

    const [isOpenModal, setOpenModal] = React.useState(false);

    const { setSortTag } = React.useContext(TagContext);

    const handleLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
        setOpenModal(false);
    };

    return (
        <div className={styles.root}>
            <Dialog open={isOpenModal} onClose={() => setOpenModal(false)}>
                <DialogContent>Are you sure you want to log out?</DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setOpenModal(false)} autoFocus>
                        CANCEL
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        LOG OUT
                    </Button>
                </DialogActions>
            </Dialog>

            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link to="/" className={styles.logo} onClick={() => setSortTag("")}>
                        BlogMan
                    </Link>
                    <div className={styles.buttons}>
                        {auth_status === "loading" ? (
                            <>
                                <Skeleton variant="rounded" width={80} height={36} />
                                <Skeleton variant="rounded" width={80} height={36} />
                            </>
                        ) : null}
                        {auth_status === "success" ? (
                            <>
                                <Link to="/add-post">
                                    <Button variant="contained">New post</Button>
                                </Link>
                                <IconButton onClick={() => setOpenModal(true)} aria-label="Logout" color="secondary">
                                    <LogoutIcon />
                                </IconButton>
                            </>
                        ) : null}
                        {auth_status === "error" ? (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Sign in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Create Account</Button>
                                </Link>
                            </>
                        ) : null}
                    </div>
                </div>
            </Container>
        </div>
    );
};
