import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CommentDetail from './CommentDetail/CommentDetail'
import React from 'react'
import { getAll} from '../../../../features/routes/routesSlice';
import { resetC } from '../../../../features/comments/commentsSlice';
import { notification } from "antd";



const Comments = () => {
    const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.comments);
  const [current, setCurrent] = useState(1);

  const getRoutesAndReset = async () => {
    await dispatch(getAll(current));
    dispatch(resetC())
  };

  useEffect(() => {
    getRoutesAndReset();
  }, [getAll, comment]);

  const { isError, isSuccess, message } = useSelector((state) => state.comments);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Éxito", description: message });
    }

    dispatch(resetC());
  }, [isError, isSuccess, message]);

  return (
    <CommentDetail pageC={current} functionPage={setCurrent}/>
  )
}

export default Comments