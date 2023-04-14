import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";

import { Header } from "components";
import { Home, PostPage, Registration, Login, AddPost } from "pages";

import { fetchAuthMe } from "redux/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "hooks";

interface ITagContext {
    sortTag: string;
    setSortTag: (arg0: string) => void;
}

export const TagContext = React.createContext({} as ITagContext);

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => Boolean(state.AuthReducer.user));

    const [sortTag, setSortTag] = React.useState("");

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <>
            <TagContext.Provider value={{ sortTag, setSortTag }}>
                <Header />
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts/:id" element={<PostPage />} />
                        {isAuth ? <Route path="/posts/:id/edit" element={<AddPost />} /> : null}
                        {isAuth ? <Route path="/add-post" element={<AddPost />} /> : null}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Container>
            </TagContext.Provider>
        </>
    );
};

export default App;
