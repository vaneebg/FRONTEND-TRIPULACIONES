import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, Comment, Button } from "antd";

import React, { useState } from "react";
import {
  createComment,
  destroyComment,
  getAll,
} from "../../../../../features/comments/commentsSlice";
import { getById, reset } from "../../../../../features/routes/routesSlice";
import { myInfo } from "../../../../../features/auth/authSlice";

const URL = process.env.REACT_APP_URL;

const CommentDetail = () => {
  const initialState = {
    body: "",
    imageComment: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { imageComment, body } = formData;
  const { newComment, eraseComment } = useSelector((state) => state.comments);
  const { isLoading, route } = useSelector((state) => state.routes);
  const [comment, setComment] = useState([]);
  const { _id } = useParams();
  const dispatch = useDispatch();

  console.log(route);

  useEffect(() => {
    if (isLoading) {
      <h1>Cargando...</h1>;
    }
    dispatch(reset());
  }, [isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!e) return;
    console.log(e.target.myFile);
    const editedData = new FormData();
    if (e.target.imageComment.files[0]) {
      editedData.set("imageComment", e.target.imageComment.files[0]);
    }
    editedData.set("body", e.target.body.value);
    let data = { editedData, routeId: _id };
    await dispatch(createComment(data));
    await dispatch(getById(_id));
    setTimeout(() => {
      setComment([...comment]);
    }, 1000);
  };

  const destroy = (_id) => {
    dispatch(destroyComment(_id));
  };

  console.log("hola");

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const commentUser = route.commentsId?.map((element) => {
    return (
      <>
        <div className="animate__animated animate__fadeIn" key={element._id}>
          <Comment
            author={<a>{element.userId?.name}</a>}
            avatar={
              <Avatar
                src={URL + "/users/" + element.userId?.imagepath}
                alt=""
              />
            }
            content={
              <>
                <p>{element.body}</p>
                <img alt="" src={URL + "/comments/" + element?.imagepath}></img>
              </>
            }
          />
          <Button
            type="danger"
            onClick={() => {
              destroy(element._id);
            }}
          >
            Borrar Post
          </Button>
        </div>
        <hr></hr>
      </>
    );
  });

  useEffect(() => {
    dispatch(getAll());
  }, [newComment]);

  useEffect(() => {
    dispatch(myInfo());
  }, []);

  return (
    <>
      <ul>{commentUser}</ul>
      <form onSubmit={onSubmit} className="form-comment-container">
        <textarea
          onChange={onChange}
          value={body}
          name="body"
          rows="4"
          cols="200"
        ></textarea>
        <input
          onChange={onChange}
          type="file"
          name="imageComment"
          value={imageComment}
        />
        <input className="loginBt" type="submit" />
      </form>
    </>
  );
};

export default CommentDetail;
