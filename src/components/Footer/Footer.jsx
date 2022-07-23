import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import './Footer.scss'

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === '/' || pathname === '/register') return null;
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