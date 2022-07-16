import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect } from "react";
import {
  
    updateUser,
} from "../../../../features/auth/authSlice";
import {
 
    Modal,
    Input,
    Button
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';



const ModalEditUser = () => {
    const [visible, setVisible] = useState(false);
    const { user,info } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const initialState = {
        name: user.name,
        email: user.email,
        imageUser: user.imagepath,
        genre: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, imageUser } = formData;



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
        setFormData(info); //
      }, [info]);

    return (<>
        <Button type="primary" onClick={() => setVisible(true)}>
            Editar Usuario
        </Button>
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
                <input
                    onChange={onChange}
                    type="file"
                    name="imageUser"
                    value={imageUser}
                />
                <input className="loginBt" type="submit" />
            </form>

        </Modal>
    </>
    )
}

export default ModalEditUser