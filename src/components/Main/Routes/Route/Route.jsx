import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { dislike, getAll, like } from '../../../../features/routes/routesSlice';
import { myInfo } from '../../../../features/auth/authSlice';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Pagination, Tooltip } from 'antd';
import './Route.scss';

const Route = ({ pageC, functionPage }) => {
  const { routes, numberRoutes } = useSelector(state => state.routes);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onChange = page => {
    functionPage(page);
    dispatch(getAll(page));
  };

  useEffect(() => {
    dispatch(myInfo());
  }, []);

  const route = routes?.map(el => {
    const isAlreadyLiked = el.likes?.includes(user?._id);
    console.log(el)
    console.log(user._id)
    return (
      <section key={el._id} className='wrapper-ok'>
        <div className='main-card'>
          <div className='card panel'>
            <div className='card-header'>
              <div className='card-header-left'>
                <img src={el.image} alt='' className='picture-title' />
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
                    <StarFilled
                      className='star'
                      onClick={() => dispatch(dislike(el._id))}
                      style={{ color: 'gold' }}
                      text={el?.likes?.length}
                    />
                  ) : (
                    <StarOutlined
                      className='star'
                      onClick={() => dispatch(like(el._id))}
                    />
                  )}

                  <span className='fav-text-icon'>{el?.likes?.length} fav</span>
                </div>
                <div className='bottom-icon-left'></div>
                {el?.transport === 'peu' ? <Tooltip color="green" title="ruta a pie">
                  <span> <i className="fa-solid fa-person-walking"></i></span>
                </Tooltip> : <Tooltip color="green" title="ruta en bici">
                  <i className="fa-solid fa-bicycle"></i>
                </Tooltip>}
              </div>
              <div className='bottom-text-card'>
                <span>{el?.description_es}</span> <br />
                <div className='bottom-adds'>
                  <p>
                    {el?.difficulty !== 'NaN' ? (
                      <>
                        <span>Dificultad:</span> {el?.difficulty}{' '}
                      </>
                    ) : (
                      <span>Dificultad no estipulada</span>
                    )}
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
