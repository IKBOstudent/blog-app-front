import { Avatar, Button, TextField } from "@mui/material";
import axios from "../../axios";
import { useState } from "react";

import styles from "./AddComment.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const AddComment = ({ onNewComment }) => {
  const [text, setText] = useState("");
  const { data } = useSelector((state) => state.AuthReducer);
  const params = useParams();

  const onSubmit = async () => {
    try {
      await axios.patch("/posts/" + params.id + "/comment", { newComment: text });
      setText("");
      onNewComment();
    } catch (err) {
      console.warn(err);
      alert(err);
    }
  };

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={data.avatarUrl} />
        <div className={styles.form}>
          <TextField
            value={text}
            onChange={(event) => setText(event.target.value)}
            label="Write comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
