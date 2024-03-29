import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  reset,
  myInfo,
  logout,
  deleteUser,
} from '../../../features/auth/authSlice';
import ModalEditUser from './ModalEditUser/ModalEditUser';
import { Tooltip, Popconfirm, Button } from 'antd';
import {
  PoweroffOutlined,
  HomeFilled,
} from '@ant-design/icons';
import './Profile.scss';

const URL = process.env.REACT_APP_URL;

const Profile = () => {
  const { user, userUpdated } = useSelector(state => state.auth);
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
      <div key={likedRoute._id} className='prof-top-cont-routes'>
        <div className='route-profile-fav'>
          <div className='col-fav-1'>
            <img src={likedRoute.image} alt='' />
          </div>
          <div className='col-fav-2'>
            <Link to={'/routes/route/' + likedRoute._id}>
              <p>{likedRoute.name}</p>
            </Link>
          </div>
        </div>
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
          <h2 className='profile-name'>{user?.name} </h2>
          <div className='top-prof-div'>
            <p>
            <Tooltip placement='bottom' title='Desconectarse'>
              <Link to='/' onClick={onLogout}>
                <PoweroffOutlined className='logo-prof' />
              </Link>
              </Tooltip>
            </p>
            <p className='profile-desc'>{user?.email}</p>
            <p>
              <Tooltip placement='bottom' title='Volver a principal'>
                <Link to='/main'>
                  <HomeFilled className='logo-prof' />
                </Link>
              </Tooltip>
            </p>
          </div>
          <div className='but-profile-div'>
            <ModalEditUser />
            <Popconfirm
              placement='bottom'
              title='Seguro que quieres borrar tu cuenta definitivamente?'
              onConfirm={() => deleteUserAndRedirect(user._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button className='btn-profileRed'>Borrar cuenta</Button>
            </Popconfirm>
          </div>
          <br />
          <br />
          <hr />
        </div>
        <br />
        <div className='rutas'>
          <h3 className='prof-h3'>Rutas favoritas</h3>
         {likedRoutes?.length!==0 ? <div className='likeRoutes'>{likedRoutes}</div> : <span>Aún no tienes ninguna ruta en favoritos 😞</span>} 
        </div>
      </div>
    </div>
  );
};

export default Profile;
