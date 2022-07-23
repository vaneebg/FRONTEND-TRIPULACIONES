import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './Route.scss';
import { Pagination } from 'antd';
import { dislike, getAll, like } from '../../../../features/routes/routesSlice';

const Route = ({ pageC, functionPage }) => {
  const { routes, numberRoutes } = useSelector(state => state.routes);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const onChange = page => {
    functionPage(page);
    dispatch(getAll(page));
  };

  const route = routes?.map(el => {
    const isAlreadyLiked = el.likes?.includes(user?._id);
    console.log(el.likes)
    console.log(user._id)
    return (
      <section key={el._id} className='wrapper-ok'>
        <div className='main-card'>
          <div className='card panel'>
            <div className='card-header'>
              <div className='card-header-left'>
                <img src={el.image} alt='' className='picture-title' />

                {/* <span className='card-title user'>{el?.name}</span> */}
              </div>
              <div className='dropdown'>
                <span className='simbol-right dropbtn'>
                  <Link to={'/routes/route/' + el._id}>{el?.name}</Link>{' '}
                </span>
              </div>
            </div>
            <img src={el.image} alt='No picture' className='main-picture' />
            <div className='bottom-container'>
              <div className='icon-container'>
                <div className='bottom-icon-right'>
                  {isAlreadyLiked ? (
                    <HeartFilled
                      className='heart'
                      onClick={() => dispatch(dislike(el._id))}
                      style={{ color: '#FF0000' }}
                      text={el.likes?.length}
                    />
                  ) : (
                    <HeartOutlined
                      className='heart'
                      onClick={() => dispatch(like(el._id))}
                    />
                  )}
                  <span>{el?.likes.length}</span>
                </div>
                <div className='bottom-icon-left'>
                  <svg
                    aria-label='Guardar'
                    className='_8-yf5 '
                    color='#8e8e8e'
                    fill='#8e8e8e'
                    height='24'
                    role='img'
                    viewBox='0 0 24 24'
                    width='24'
                  >
                    <polygon
                      fill='none'
                      points='20 21 12 13.44 4 21 4 3 20 3 20 21'
                      stroke='black'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                    ></polygon>
                  </svg>
                </div>
              </div>
              <div className='bottom-text-card'>
                <span>{el?.description_es}</span> <br />
                <div className='bottom-adds'>
                  <p>
                    <span>Dificultad:</span> {el?.difficulty}
                  </p>{' '}
                  <p>
                    <span>Duración:</span> {el?.duration}'
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  });

  return (
    <>
      <Pagination
        total={numberRoutes}
        current={pageC}
        onChange={onChange}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={1}
      />
      {route}
      <Pagination
        total={numberRoutes}
        current={pageC}
        onChange={onChange}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={1}
      />
    </>
  );
};
export default Route;
