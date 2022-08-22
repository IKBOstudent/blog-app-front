import React from "react";
import { Button, Paper, TextField } from "@mui/material";
import SimpleMdeReact from "react-simplemde-editor";
import axios from "../../axios";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const AddPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.AuthReducer.data));

  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  // const [isLoading, setLoading] = React.useState("");

  const inputFileRef = React.useRef();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(String(process.env.REACT_APP_API_URL) + data.url);
    } catch (err) {
      console.warn(err);
      alert(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  React.useEffect(() => {
    if (params.id) {
      axios
        .get(`/posts/${params.id}`)
        .then(({ data }) => {
          setTitle(data.post.title);
          setText(data.post.text);
          setImageUrl(data.post.imageUrl);
          setTags(data.post.tags.join(" "));
        })
        .catch((err) => {
          console.warn(err);
          alert(err);
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      // setLoading(true);

      if (imageUrl) {
        setImageUrl(
          params.id
            ? imageUrl
            : String(process.env.REACT_APP_API_URL) + imageUrl
        );
      }

      const fields = {
        title,
        text,
        tags: tags.split(" "),
        imageUrl: imageUrl ? imageUrl : "",
      };

      const { data } = params.id
        ? await axios.patch("/posts/" + params.id, fields)
        : await axios.post("/posts", fields);

      const id = params.id ? params.id : data.post._id;
      navigate(`/posts/${id}`);
    } catch (err) {
      console.warn(err);
      alert(err);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Your post text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper className={styles.root}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Load image
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            style={{ marginLeft: 20 }}
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img className={styles.image} src={imageUrl} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
        fullWidth
      />
      <SimpleMdeReact
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {params.id ? "Save" : "Publish"}
        </Button>
        <Link to="/" className={styles.button_cancel}>
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
