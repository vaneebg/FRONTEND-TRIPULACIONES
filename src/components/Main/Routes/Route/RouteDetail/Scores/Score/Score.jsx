import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllScores,
  reset,
  deleteScore,
} from '../../../../../../../features/scores/scoresSlice';
import { myInfo } from '../../../../../../../features/auth/authSlice';
import { Avatar, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const URL = process.env.REACT_APP_URL;

const Score = () => {
  const dispatch = useDispatch();
  const { scores, newScore } = useSelector(state => state.scores);
  const { route } = useSelector(state => state.routes);

  const { user } = useSelector(state => state.auth);
  const getScoresAndReset = async () => {
    await dispatch(getAllScores());
    dispatch(reset());
  };

  useEffect(() => {
    getScoresAndReset();
  }, [getAllScores, newScore]);
  useEffect(() => {
    dispatch(myInfo());
  }, []);

  const scoresPint = scores.scores?.map((el, i) => {
    if (route?._id === el?.routeId) {
      return (
        <div key={i} className='score-div'>
          <Avatar src={URL + '/users/' + el.userId?.imagepath} alt='' />
          <span>{el?.userId?.name}</span>
          <span>{el?.score}</span>
          {el?.userId?._id === user?._id ? (
            <>
              {' '}
              <Popconfirm
                placement='rightTop'
                title='Seguro que quieres borrar esta puntuación?'
                onConfirm={() => dispatch(deleteScore(el?._id))}
                okText='Yes'
                cancelText='No'
              >
                <button className='btnModalC'>
                  <DeleteOutlined />
                </button>
              </Popconfirm>{' '}
            </>
          ) : null}
        </div>
      );
    } else {
      return <div key={i}></div>;
    }
  });

  return (
    <>
      <span>Valoraciones anteriores</span>
      {scoresPint}
    </>
  );
};

export default Score;
