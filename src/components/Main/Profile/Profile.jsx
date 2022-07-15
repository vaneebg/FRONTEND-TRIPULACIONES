import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { reset, myInfo, logout,deleteUser } from "../../../features/auth/authSlice";
import { Tooltip, notification, Popconfirm } from 'antd';
import { PoweroffOutlined, FastBackwardOutlined } from "@ant-design/icons";

const URL = process.env.REACT_APP_URL

console.log("url", URL)
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(myInfo())
  }, []);

  const onLogout = () => {
    dispatch(logout());
  }
console.log(user)

  const deleteUserAndRedirect = (_id) => {
    dispatch(deleteUser(_id))
    navigate("/");
    dispatch(reset());
    }
    return (
      <>
        <Tooltip placement="bottom" title="Volver a principal">
          <Link to="/main"><FastBackwardOutlined style={{
            fontSize: '3.5em',
            color: 'white',
          }} /></Link>
        </Tooltip>
        {user.imagepath ? <img src={URL + "/images/users/" + user.imagepath} alt='' /> : null}
        {user.name} <br />
        {user.genre}
        <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>
        <Popconfirm
          placement="bottom"
          title="Seguro que quieres borrar tu cuenta definitivamente?"
          onConfirm={() => deleteUserAndRedirect((user._id))}
          okText="Yes"
          cancelText="No"
        >
          Borrar cuenta
        </Popconfirm>
      </>
    )
  
}

export default Profile