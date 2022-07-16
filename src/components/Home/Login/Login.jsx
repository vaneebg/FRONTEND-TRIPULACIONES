import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login, reset } from '../../../features/auth/authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import pic from '../../../assets/route_login.png';
import './Login.scss';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const { isError, isSuccess, message, messageLogout, messageDelete } =
    useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (messageLogout) {
      notification.success({ message: 'Éxito', description: messageLogout });
    }
    if (messageDelete) {
      notification.success({ message: 'Éxito', description: messageDelete });
    }
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message });
      setTimeout(() => {
        navigate('/main');
      }, 3000);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, messageLogout, messageDelete]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='col-1'>
          <img src={pic} alt='fondo' />
        </div>
        <div className='col-2'>
          <form onSubmit={onSubmit} className='form-login-container'>
            <label htmlFor='email'>Correo:</label>
            <Input
              prefix={<MailOutlined />}
              type='email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <label htmlFor='password'>Contraseña:</label>
            <Input
              prefix={<LockOutlined />}
              type='password'
              name='password'
              value={password}
              onChange={onChange}
            />
            <button type='submit'>Login</button>
            <span>
              Si no tienes cuenta, <Link to='/register'>Regístrate</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
