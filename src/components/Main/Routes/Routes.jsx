import Route from './Route/Route';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, reset } from '../../../features/routes/routesSlice';
import { Skeleton } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import { Link } from 'react-scroll';
import './Routes.scss';

const Routes = () => {
  const { isLoading } = useSelector(state => state.routes);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);

  const getRoutesAndReset = async () => {
    await dispatch(getAll(current));
    dispatch(reset());
  };

  useEffect(() => {
    getRoutesAndReset();
  }, [getAll]);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} />;
  }
  return (
    <div className='main'>
      <h1 id='h2'>Rutas</h1>
      <Route pageC={current} functionPage={setCurrent} />
      <div className='barra-nav'>
        <button className='up'>
          <Link
            activeClass='active'
            spy={true}
            smooth={true}
            duration={800}
            to='h2'
            title='Sube al menú'
          >
            {' '}
            <CaretUpOutlined />
            <CaretUpOutlined />
            <CaretUpOutlined />
          </Link>
        </button>
      </div>
    </div>
  )
};

export default Routes