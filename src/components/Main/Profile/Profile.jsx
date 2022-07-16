import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  reset,
  myInfo,
  logout,
  deleteUser,
  updateUser,
} from "../../../features/auth/authSlice";
import {
  Tooltip,
  notification,
  Popconfirm,
  Modal,
  Input,
  Button
} from "antd";
import {
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { PoweroffOutlined, FastBackwardOutlined } from "@ant-design/icons";

const URL = process.env.REACT_APP_URL;



const Profile = () => {
  const [visible, setVisible] = useState(false);
  const { user, userUpdated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    imageUser: "",
    genre:"",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, email, imageUser } = formData;
  useEffect(() => {
  dispatch(myInfo());
}, []);


  const onSubmit = async (e) => {
    console.log(e.target.genre.value)
    e.preventDefault();
    const editedData = new FormData();
    if (e.target.imageUser.files[0]) {
      editedData.set("imageUser", e.target.imageUser.files[0]);
    }
    editedData.set("name", e.target.name.value);
    editedData.set("genre", e.target.genre.value);
    editedData.set("email", e.target.email.value);
    setVisible(false);
    await dispatch(updateUser(editedData));
  };
  const onLogout = () => {
    dispatch(logout());
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteUserAndRedirect = (_id) => {
    dispatch(deleteUser(_id));
    navigate("/");
    dispatch(reset());
  };

  useEffect(() => {
    dispatch(myInfo()); //
  }, [userUpdated]);

  return (
    <>
      <Tooltip placement="bottom" title="Volver a principal">
        <Link to="/main">
          <FastBackwardOutlined
            style={{
              fontSize: "3.5em",
              color: "white",
            }}
          />
        </Link>
      </Tooltip>
      <Modal
        title="Editar usuario"
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <form onSubmit={onSubmit}>
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
          <label htmlFor="email">Correo: </label>
          <Input
            prefix={<MailOutlined />}
            placeholder="pepito@gmail.com"
            type="email"
            name="email"
            value={email}
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
          <input
            onChange={onChange}
            type="file"
            name="imageUser"
            value={imageUser}
          />
          <input className="loginBt" type="submit" />
        </form>
      </Modal>
      {user.imagepath ? (
        <img src={URL + "/users/" + user.imagepath} alt="" width="250px" />
      ) : null}
      {user.genre}
      {user.name} <br />
      <Link to="/" onClick={onLogout}>
        <PoweroffOutlined />
      </Link>
      <Button type="primary" onClick={() => setVisible(true)}>
          Editar Usuario
        </Button>
      <Popconfirm
        placement="bottom"
        title="Seguro que quieres borrar tu cuenta definitivamente?"
        onConfirm={() => deleteUserAndRedirect(user._id)}
        okText="Yes"
        cancelText="No"
      >
        Borrar cuenta
      </Popconfirm>
    </>
  );
};

export default Profile;
