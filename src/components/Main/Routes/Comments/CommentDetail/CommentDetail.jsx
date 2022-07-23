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
import ModalEditComment from "./EditComment/ModalEditComment";

const URL = process.env.REACT_APP_URL;

const CommentDetail = () => {
  const initialState = {
    body: "",
    imageComment: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { imageComment, body } = formData;
  const { user } = useSelector((state) => state.auth);
  const { comments, eraseComment, commentUpdated } = useSelector((state) => state.comments);
  const [comment, setComment] = useState([]);
  const { _id } = useParams();
  const dispatch = useDispatch();

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
    await dispatch(getAll());
    setTimeout(() => {
      setComment([...comment]);
    }, 1000);
  };

  const destroy = async (_id) => {
    await dispatch(destroyComment(_id));
  };

  useEffect(() => {
    dispatch(getAll());
  }, [eraseComment]);

  useEffect(() => {
    dispatch(getAll());
  }, [commentUpdated]);


  console.log("hola");

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const commentUser = comments.map((element) => {
    return (
      <>
        {_id === element.routeId ? (
          <>
            <div
              className="animate__animated animate__fadeIn"
              key={element._id}
            >
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
                    <img
                      alt=""
                      src={URL + "/comments/" + element?.imagepath}
                    ></img>
                  </>
                }
              />
              {element.userId._id === user._id ? (
                <>
                  <Button
                    type="danger"
                    onClick={() => {
                      destroy(element._id);
                    }}
                  >
                    Borrar Comentario
                  </Button>
                  <ModalEditComment commentId = {element._id} />
                </>
              ) : (
                ""
              )}
            </div>
            <hr></hr>
          </>
        ) : (
          ""
        )}
      </>
    );
  });

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
