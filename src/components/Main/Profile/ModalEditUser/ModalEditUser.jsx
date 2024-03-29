import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { resetPassword, updateUser } from "../../../../features/auth/authSlice";
import { Modal, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import './ModalEditUser.scss'
const ModalEditUser = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    email: "",
    imageUser: "",
    genre: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, password, imageUser } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedData = new FormData();
    if (e.target.imageUser.files[0]) {
      editedData.set("imageUser", e.target.imageUser.files[0]);
    }
    editedData.set("name", e.target.name.value);
    editedData.set("genre", e.target.genre.value);
    editedData.set("password", e.target.password.value);
    setVisible(false);
    await dispatch(updateUser(editedData));
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormData(user);
    dispatch(resetPassword());
  }, [user]);

  return (
    <>
      <Button type="primary btn-profile2" onClick={() => setVisible(true)}>
        Editar Usuario
      </Button>
      <Modal
        title="Editar usuario"
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <form className ='test' onSubmit={onSubmit}>
          <label htmlFor="name">Nombre de usuario:</label>
          <Input
            prefix={<UserOutlined />}
            placeholder="pepito"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <label htmlFor="genre">Género:</label>

          <select name="genre">
            <option disabled selected value>
              Selecciona
            </option>
            <option value="men" onChange={onChange}>
              Hombre
            </option>
            <option value="women" onChange={onChange}>
              Mujer
            </option>
          </select>
          <label htmlFor="password">Introduce tu contraseña:</label>
          <Input
            prefix={<LockOutlined />}
            type="password"
            name="password"
            placeholder="*******"
            value={password}
            onChange={onChange}
            required
          />
          <input
            onChange={onChange}
            type="file"
            name="imageUser"
            value={imageUser}
          />
          <div className='buttonEditUserContainer'>
          <input className="loginBt" type="submit" />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalEditUser;
