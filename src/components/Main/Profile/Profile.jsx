import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  reset,
  myInfo,
  logout,
  deleteUser,
} from '../../../features/auth/authSlice';
import { Tooltip, Popconfirm } from 'antd';
import { PoweroffOutlined, FastBackwardOutlined } from '@ant-design/icons';
import ModalEditUser from './ModalEditUser/ModalEditUser';
import './Profile.scss';

const URL = process.env.REACT_APP_URL;

const Profile = () => {
  const { user, userUpdated } = useSelector(state => state.auth);
  console.log('user', user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
  };

  const deleteUserAndRedirect = _id => {
    dispatch(deleteUser(_id));
    navigate('/');
    dispatch(reset());
  };

  useEffect(() => {
    dispatch(myInfo());
  }, [userUpdated]);

  const likedRoutes = user?.likes?.map(likedRoute => {
    return (
      <div key={likedRoute._id}>
        <Link to={'/routes/route/' + likedRoute._id}>
          <p>{likedRoute.name}</p>
        </Link>
      </div>
    );
  });

  return (
    <div className='profile-container'>
      <div className='profile-card'>
        <div className='profile-card-header'>
          <div className='profile-image2'>
            {user.imagepath ? (
              <img
                src={URL + '/users/' + user.imagepath}
                alt=''
                className='profile-image'
              />
            ) : null}
          </div>
        </div>
        <div className='profile-info'>
          <h2 className='profile-name'>
            {user?.name}{' '}
            <span>
              <Link to='/' onClick={onLogout}>
                <PoweroffOutlined />
              </Link>
            </span>
          </h2>

          <p className='profile-desc'>{user?.genre}</p>
          <p className='profile-desc'>3</p>
        </div>
        <Tooltip placement='bottom' title='Volver a principal'>
          <Link to='/main'>
            <FastBackwardOutlined
              style={{
                fontSize: '3.5em',
                color: 'black',
              }}
            />
          </Link>
        </Tooltip>
        {/* {user.imagepath ? (
          <img src={URL + '/users/' + user.imagepath} alt='' width='250px' />
        ) : null} */}
        <span>Género:{user?.genre}</span>
        <span>Nombre: {user?.name} </span> <br />
        <ModalEditUser />
        <Popconfirm
          placement='bottom'
          title='Seguro que quieres borrar tu cuenta definitivamente?'
          onConfirm={() => deleteUserAndRedirect(user._id)}
          okText='Yes'
          cancelText='No'
        >
          <button className='Button'>Borrar cuenta</button>
        </Popconfirm>
        <br />
        <br />
        <br />
        <div className='rutas'>
          <p>Aquí van las rutas</p>
          <div>{likedRoutes}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
