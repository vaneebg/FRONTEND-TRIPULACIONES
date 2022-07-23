import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
  setCommentToEdit,
  updateComment,
} from '../../../../../../features/comments/commentsSlice';

const ModalEditComment = ({ commentId }) => {
  const [visible, setVisible] = useState(false);
  const { comments, commentToEdit } = useSelector(state => state.comments);
  const dispatch = useDispatch();
  const getId = () => {
    setVisible(true);
    const editComment = comments.filter(e => e._id === commentId);
    dispatch(setCommentToEdit(editComment));
  };

  const initialState = {
    body: '',
    imageComment: '',
  };
  const [formData, setFormData] = useState(initialState);

  const { body, imageComment } = formData || {};

  const onSubmit = async e => {
    e.preventDefault();
    const editedData = new FormData();
    if (e.target.imageComment.files[0]) {
      editedData.set('imageComment', e.target.imageComment.files[0]);
    }
    editedData.set('body', e.target.body.value);
    setVisible(false);
    const generalData = { editedData: editedData, commentId: commentId };
    await dispatch(updateComment(generalData));
  };
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormData(commentToEdit[0]);
  }, [commentToEdit]);

  return (
    <>
      <Button type='primary' onClick={() => getId()}>
        <EditOutlined />
      </Button>
      <Modal
        title='Editar'
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <form onSubmit={onSubmit}>
          <Input
            type='text'
            name='body'
            value={body}
            onChange={onChange}
            required
          />
          <input
            onChange={onChange}
            type='file'
            name='imageComment'
            value={imageComment}
          />
          <input className='loginBt' type='submit' />
        </form>
      </Modal>
    </>
  );
};

export default ModalEditComment;
