import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import './Footer.scss'

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === '/' || pathname === '/register') return null;
  return (
    <div className='footerContainer'>
      <Link to='/main'>Rutas</Link>
      <Link to='/quiz'>Recomendación</Link>
      <Link to='/profile'>Perfil</Link>
      <Link to='/aboutUs'>Sobre nosotros</Link>
    </div>
  )
}

export default Footer