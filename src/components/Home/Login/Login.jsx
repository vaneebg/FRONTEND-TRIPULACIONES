import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login, reset } from '../../../features/auth/authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector(state => state.auth);
const navigate=useNavigate()
  useEffect(() => {
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message });
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
    setTimeout(() => {
      navigate('/main')
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
      </form>
      <span>
        Si no tienes cuenta,<Link to='/register'>Regístrate</Link>
      </span>
    </div>
  );
};
export default Login;
