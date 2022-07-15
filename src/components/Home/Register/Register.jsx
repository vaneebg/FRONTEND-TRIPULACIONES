import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserOutlined,
  MailOutlined,
  ContactsOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { notification, Input } from 'antd';
import { register, reset } from '../../../features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    password2: '',
    genre: '',
    imageUser: '',
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, password2, genre, imageUser } = formData;

  const navigate=useNavigate()
  const dispatch = useDispatch();

  const { isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: 'Éxito register', description: message });
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
    if (isError) {
      notification.error({ message: 'Error register', description: message });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      notification.error({ message: 'Las contraseñas no coindicen' });
    } else {
      const formData = new FormData();
      if (e.target.imageUser.files[0])
        formData.set('imageUser', e.target.imageUser.files[0]);
      formData.set('name', e.target.name.value);
      formData.set('genre', e.target.genre.value);
      formData.set('email', e.target.email.value);
      formData.set('password', e.target.password.value);
      dispatch(register(formData));
      setFormData(initialState);
     
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Nombre de usuario:</label>
        <Input
          prefix={<UserOutlined />}
          placeholder='pepito'
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
        <label htmlFor='email'>Correo: </label>
        <Input
          prefix={<MailOutlined />}
          placeholder='pepito@gmail.com'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          required
        />
        <label htmlFor='genre'>Género:</label>

        <select name='genre'>
          <option disabled selected value>
            Selecciona
          </option>
          <option value='men' onChange={onChange}>
            Hombre
          </option>
          <option value='women' onChange={onChange}>
            Mujer
          </option>
        </select>

        <label htmlFor='password'>Introduce tu contraseña:</label>
        <Input
          prefix={<LockOutlined />}
          type='password'
          name='password'
          placeholder='*******'
          value={password}
          onChange={onChange}
          required
        />
        <label htmlFor='password2'>Introduce de nuevo tu contraseña:</label>
        <Input
          prefix={<LockOutlined />}
          type='password'
          name='password2'
          placeholder='*******'
          value={password2}
          onChange={onChange}
          required
        />
        <input
          onChange={onChange}
          type='file'
          value={imageUser}
          name='imageUser'
        />
        <input className='loginBt' type='submit' />
      </form>
    </div>
  );
};

export default Register;
