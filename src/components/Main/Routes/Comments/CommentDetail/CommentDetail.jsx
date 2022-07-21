import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, Comment, Form, Input, Button } from "antd";
import { Pagination } from "antd";
import React, { useState } from "react";
// import moment from "moment";
import { createComment } from "../../../../../features/comments/commentsSlice";
import { getAll,getById,reset} from "../../../../../features/routes/routesSlice";
import { myInfo } from "../../../../../features/auth/authSlice";

const { TextArea } = Input;
const validateMessages = {
  required: "${label} es requerido",
};

const url = process.env.REACT_APP_URL;

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
  const { comments, numberComments } = useSelector((state) => state.comments);
  const { route } = useSelector((state) => state.routes);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.routes);
  const [comment, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { _id } = useParams();
  const dispatch = useDispatch();

  const onChange = (page) => {
    functionPage(page);
    dispatch(getAll(page));
  };

  useEffect(() => {
    if (isLoading) {
      <h1>Cargando...</h1>;
    }
    dispatch(reset());
  }, [isLoading]);


  const handleSubmit = async () => {
    if (!value) return;
    let data = { body: value, postId: _id };
    setSubmitting(true);
    await dispatch(createComment(data));
    dispatch(getById(_id));
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComment([
        ...comment,
        {
          author: route.userId.name,
          avatar: url+ user.imagepath,
          content: <p>{value}</p>,
        },
      ]);
    }, 1000);
  };
  const handleChange = async (e) => {
    setValue(e.target.value);
  };

  const commentUser = route.commentsId?.map((element)=>{
    return (
      <>
      <div className= 'animate__animated animate__fadeIn'key={element._id}>
        <Comment
          author={<a>{element.userId?.name}</a>}
          avatar={
            <Avatar src={url+element.userId.imagepath} alt="" />
          }
          content={<p>{element.body}</p>}
        />
      </div>
      <hr></hr>
      </>

    )
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, [comments]);

  useEffect(() => {
    dispatch(myInfo());
  }, []);

  return (
    <>
      <br /> <br />
      <Pagination
        total={numberComments}
        current={pageC}
        onChange={onChange}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={1}
      />
      {comment}
      <Pagination
        current={pageC}
        total={numberComments}
        onChange={onChange}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={1}
      />
      {/* <div className="Caja">
      <div className="WrapperContainer">
        <div className="CommentsContainer"> */}
          <p><img className='ImageUserPost' src= {url + route?.userId?.imagepath} alt=''></img>{route.userId?.name}</p>
          <p>{route.name}</p>
          <p>{route.description_es}</p>
          <ul>{commentUser}</ul>
        {/* </div>
        <div> */}
          <Comment
            avatar={
              <Avatar src={url + user.imagepath} alt="alt" />
            }
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        {/* </div> */}
      {/* </div> */}
    {/* </div> */}
    </>
  );
};

export default CommentDetail;
