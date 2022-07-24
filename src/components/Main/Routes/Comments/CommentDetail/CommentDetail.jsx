import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createComment,
  destroyComment,
  getAll,
} from '../../../../../features/comments/commentsSlice';
import ModalEditComment from './EditComment/ModalEditComment';
import { Avatar, Comment, Button, Tooltip } from 'antd';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

const URL = process.env.REACT_APP_URL;

const CommentDetail = () => {
  const initialState = {
    body: '',
    imageComment: '',
  };

  const [formData, setFormData] = useState(initialState);
  const { imageComment, body } = formData;
  const { user } = useSelector(state => state.auth);
  const { comments, eraseComment, commentUpdated } = useSelector(
    state => state.comments
  );
  const [comment, setComment] = useState([]);
  const { _id } = useParams();
  const dispatch = useDispatch();

  const onSubmit = async e => {
    e.preventDefault();
    if (!e) return;
    const editedData = new FormData();
    if (e.target.imageComment.files[0]) {
      editedData.set('imageComment', e.target.imageComment.files[0]);
    }
    editedData.set('body', e.target.body.value);
    let data = { editedData, routeId: _id };
    await dispatch(createComment(data));
    await dispatch(getAll());
    setFormData(initialState)
    setTimeout(() => {
      setComment([...comment]);
    }, 1000);
  };

  const destroy = async _id => {
    await dispatch(destroyComment(_id));
  };

  useEffect(() => {
    dispatch(getAll());
  }, [eraseComment]);

  useEffect(() => {
    dispatch(getAll());
  }, [commentUpdated]);


  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const commentUser = comments.map(element => {
    console.log(element)
    return (
      <>
        {_id === element.routeId ? (
          <>
            <div
              className='animate__animated animate__fadeIn'
              key={element._id}
            >
              <div className='comment-detail-route-prof'>
                <Comment
                  author={<a>{element.userId?.name}</a>}
                  avatar={
                    <Avatar
                      src={URL + '/users/' + element.userId?.imagepath}
                      alt=''
                    />
                  }
                  content={
                    <>
                      <div className='comment-detail-route'>
                        <p>{element.body}</p>
                      </div>
                      {element.imagepath ? (
                      <img
                        alt=''
                        src={URL + '/comments/' + element?.imagepath}
                        className='comment-img'
                      ></img>
                      ) : ( <img
                        alt=''
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
                        className='comment-img'
                      ></img>)}
                    </>
                  }
                  datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{element.createdAt.slice(0, 10)}</span>
                    </Tooltip>
                  }
                />
              </div>
              {element.userId._id === user._id ? (
                <>
                  <div className='comment-btn'>
                    <Button
                      type='danger'
                      onClick={() => {
                        destroy(element._id);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    <ModalEditComment commentId={element._id} />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </>
        ) : (
          ''
        )}
      </>
    );
  });

  return (
    <>
      <ul>{commentUser}</ul>
      <form onSubmit={onSubmit} className='form-comment-container'>
        <textarea
          onChange={onChange}
          value={body}
          name='body'
          rows='4'
          cols='20'
        ></textarea>
        <input
          onChange={onChange}
          type='file'
          name='imageComment'
          value={imageComment}
          className='input-file-comment'
        />
        <input className='loginBt comment-detail-bt' type='submit' />
      </form>
    </>
  );
};

export default CommentDetail;
