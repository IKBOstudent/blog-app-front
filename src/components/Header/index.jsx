import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TagContext } from '../../App';
import { logout } from '../../redux/slices/AuthSlice';
import styles from './Header.module.scss';
import React from 'react';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => Boolean(state.AuthReducer.data));

    const [isOpenModal, setOpenModal] = React.useState(false);

    const { setSortTag } = useContext(TagContext);

    return (
        <div className={styles.root}>
            <Dialog open={isOpenModal} onClose={() => setOpenModal(false)}>
                <DialogContent>Are you sure you want to log out?</DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setOpenModal(false)} autoFocus>
                        CANCEL
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            dispatch(logout());
                            window.localStorage.removeItem('token');
                        }}>
                        LOG OUT
                    </Button>
                </DialogActions>
            </Dialog>

            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link to="/" className={styles.logo} onClick={() => setSortTag('')}>
                        BlogMan
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/add-post">
                                    <Button variant="contained">New post</Button>
                                </Link>
                                <IconButton
                                    onClick={() => setOpenModal(true)}
                                    aria-label="Logout"
                                    color="secondary">
                                    <LogoutIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Sign in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Create Account</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
