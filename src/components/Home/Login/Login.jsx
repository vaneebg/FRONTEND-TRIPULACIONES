import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input} from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };


  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const dispatch = useDispatch();



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault()
    // dispatch(login(formData));
  }

  return (
    <div>
      <form  onSubmit={onSubmit}>
        <label  htmlFor="email">Correo:</label>
        <Input prefix={<MailOutlined />} type="email" name="email" value={email} onChange={onChange} />
        <label htmlFor="password">Contraseña:</label>
        <Input prefix={<LockOutlined />} type="password" name="password" value={password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login