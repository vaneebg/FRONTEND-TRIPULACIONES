import { Link } from 'react-router-dom';
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footerContainer'>
      <Link to='/profile'>Perfil</Link>
      <Link to='/quiz'>Cuestionario</Link>
      <Link to='/main'>Principal</Link>
      <Link to='/aboutUs'>Sobre nosotros</Link>
    </div>
  )
}

export default Footer