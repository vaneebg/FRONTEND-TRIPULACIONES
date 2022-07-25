import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { dislike, getAll, like } from '../../../../features/routes/routesSlice';
import { myInfo } from '../../../../features/auth/authSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Pagination, Tooltip, Rate } from 'antd';

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
    const punt = el?.scoresId.map(score => {
      return score?.score;
    });
    let sum;
    let diff;
    let length;
    if (punt?.length !== 0) {
      length = punt?.length;
      sum = punt.reduce((a, b) => a + b);
      const division = sum / punt.length.toFixed(2);
      diff = division.toFixed(2);
    } else {
      <span></span>;
    }
    const isAlreadyLiked = el.likes?.includes(user?._id);
    let icon;
    switch (el?.type) {
      case 'Històrica':
        icon = (
          <Tooltip color='brown' placement='bottom' title='ruta histórica'>
            <span>
              {' '}
              <i className='fa-solid fa-building-columns'></i>
            </span>
          </Tooltip>
        );
        break;
      case 'Turística':
        icon = (
          <Tooltip color='brown' placement='bottom' title='ruta turística'>
            <span>
              {' '}
              <i className='fa-solid fa-mountain-sun'></i>
            </span>
          </Tooltip>
        );
        break;
      case 'Patrimonial':
        icon = (
          <Tooltip color='brown' placement='bottom' title='ruta Patrimonial'>
            <span>
              <i className='fa-solid fa-vihara'></i>
            </span>
          </Tooltip>
        );
        break;
      case 'Literària':
        icon = (
          <Tooltip color='brown' placement='bottom' title='ruta Literaria'>
            <span>
              <i className='fa-solid fa-book-open-reader'></i>
            </span>
          </Tooltip>
        );
        break;
      default:
        icon = 'no se qué soy';
    }
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
            <img src={el.image} alt='No' className='main-picture' />
            <div className='bottom-container'>
              <div className='icon-container'>
                <div className='bottom-icon-right'>
                  {isAlreadyLiked ? (
                    <HeartFilled
                      className='star'
                      onClick={() => dispatch(dislike(el._id))}
                      style={{ color: 'red' }}
                      text={el?.likes?.length}
                    />
                  ) : (
                    <HeartOutlined
                      className='star'
                      style={{ color: 'red' }}
                      onClick={() => dispatch(like(el._id))}
                    />
                  )}

                  <span className='fav-text-icon'>{el?.likes?.length} fav</span>
                </div>
                {el.scoresId.length !== 0 ? (
                  <span className='versionPc'>
                    <Rate disabled defaultValue={diff} /> {diff}/{length}
                  </span>
                ) : null}
                <div className='bottom-icon-left'>
                  {el?.transport === 'peu' ? (
                    <Tooltip color='green' title='A pie'>
                      <span>
                        {' '}
                        <i className='fa-solid fa-person-walking'></i>
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip color='green' title='En bici'>
                      <i className='fa-solid fa-bicycle'></i>
                    </Tooltip>
                  )}
                  <span>{icon}</span>
                </div>
              </div>
              <div className='bottom-text-card'>
                <span>{el?.description_es}</span> <br />
                {el.scoresId.length !== 0 ? (
                  <span className='versionMobile'>
                    <Rate disabled defaultValue={diff} /> {diff}/{length}
                  </span>
                ) : null}
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
    <div className='pag-ok'>
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
    </div>
  );
};
export default Route;
