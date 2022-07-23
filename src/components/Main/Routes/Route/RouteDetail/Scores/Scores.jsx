import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createScore,
  reset,
} from '../../../../../../features/scores/scoresSlice';
import { Input, notification } from 'antd';

const Score = ({ routeId }) => {

  const initialState = {
    score: 1,
  };

  const [scorePunt, setScorePunt] = useState(initialState);
  const { score } = scorePunt;

  const dispatch = useDispatch();

  const onChange = e => {
    setScorePunt(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const data = { score, routeId };
    dispatch(createScore(data));
    setScorePunt(initialState);
  };

  const { isError, isSuccess, message } = useSelector(state => state.scores);

  useEffect(() => {
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message });
    }

    dispatch(reset());
  }, [isError, isSuccess, message]);
  return (
    <div>
      <form onSubmit={onSubmit} className='form-route-detail'>
        <label htmlFor='score'>Puntuación:</label>
        <Input
          type='number'
          name='score'
          min='1'
          max='5'
          value={score}
          onChange={onChange}
          required
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Score;
