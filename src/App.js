import Container from "@mui/material/Container";
import React, { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, Login, AddPost } from "./pages";
import { fetchAuthMe } from "./redux/slices/AuthSlice";

export const TagContext = createContext();

function App() {
  const dispatch = useDispatch();

  const [sortTag, setSortTag] = useState("");
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <TagContext.Provider value={{ sortTag, setSortTag }}>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Container>
      </TagContext.Provider>
    </>
  );
}

export default App;
