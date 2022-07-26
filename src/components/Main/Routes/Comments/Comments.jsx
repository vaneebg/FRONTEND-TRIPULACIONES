import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentDetail from './CommentDetail/CommentDetail';
import { getAll, resetC } from '../../../../features/comments/commentsSlice';
import { notification } from 'antd';

const Comments = () => {
  const dispatch = useDispatch();
  const { comment } = useSelector(state => state.comments);

  const getRoutesAndReset = async () => {
    await dispatch(getAll());
    dispatch(resetC());
  };

  useEffect(() => {
    getRoutesAndReset();
  }, [getAll, comment]);

  const { isError, isSuccess, message } = useSelector(state => state.comments);

  useEffect(() => {
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message });
    }

    dispatch(resetC());
  }, [isError, isSuccess, message]);

  return (
    <div>
      <CommentDetail />
    </div>
  );
};

export default Comments;
