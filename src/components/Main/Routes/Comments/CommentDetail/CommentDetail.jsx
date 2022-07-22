import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, Comment, Form, Input, Button } from "antd";
// import { Pagination } from "antd";
import React, { useState } from "react";
import {createComment} from "../../../../../features/comments/commentsSlice";
import { getAll, getById, reset } from "../../../../../features/routes/routesSlice";
import { myInfo } from "../../../../../features/auth/authSlice";

const { TextArea } = Input;
const validateMessages = {
  required: "${label} es requerido",
};

const URL = process.env.REACT_APP_URL;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form validateMessages={validateMessages}>
      <Form.Item name={["comentario"]} rules={[{ required: true }]}>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Comentar
        </Button>
      </Form.Item>
    </Form>
  </>
);

const CommentDetail = ({ pageC, functionPage }) => {
  const { comments, newComment } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.auth);
  const { isLoading, route } = useSelector((state) => state.routes);
  const [comment, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { _id } = useParams();
  const dispatch = useDispatch();

  // const onChange = (page) => {
  //   functionPage(page);
  //   dispatch(getAll(page));
  // };

  useEffect(() => {
    if (isLoading) {
      <h1>Cargando...</h1>;
    }
    dispatch(reset());
  }, [isLoading]);

  const handleSubmit = async () => {
    if (!value) return;
    let data = { body: value, routeId: _id };
    setSubmitting(true);
    await dispatch(createComment(data));
    // await dispatch(getById(_id));
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComment([...comment]);
    }, 1000);
  };
  const handleChange = async (e) => {
    setValue(e.target.value);
  };

  console.log(_id)
  console.log(comments)

  console.log(route)

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
            content={<p>{element.body}</p>}
          />
        </div>
        <hr></hr>
      </>
    );
  });

  useEffect(() => {
    dispatch(getAll ());
  }, [newComment]);

  useEffect(() => {
    dispatch(myInfo());
  }, []);

  return (
    <>
      {/* <br /> <br />
      <Pagination
        total={numberComments}
        current={pageC}
        onChange={onChange}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={1}
      /> */}
     {/* {_id === comments[0]?.routeId ? ( */}
      <ul>{commentUser}</ul>
      {/* ) : ( */}
      {/* )} */}
      <Comment
        avatar={<Avatar src={URL + "/users/" + user.imagepath} alt="alt" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default CommentDetail;
