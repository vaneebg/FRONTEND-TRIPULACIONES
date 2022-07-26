import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommended, reset } from '../../../features/quiz/quizSlice';
import { getAllNotPage } from '../../../features/routes/routesSlice';
import { Link } from 'react-router-dom';
import './GetRecommended.scss';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Pagination, Tooltip, Rate } from 'antd';

const GetRecommended = () => {
  const { userId, routeRecommended } = useSelector(state => state.quiz);
  const { routesCompleted } = useSelector(state => state.routes);
  const dispatch = useDispatch();
  const id = routeRecommended?.recommended_route_id;
  const routeFinal = routesCompleted[id - 1];

console.log('Soy la ruta recomendada',routeRecommended);
console.log('Soy la ruta completada',routesCompleted);
console.log('Soy la ruta final', routeFinal);

  console.log('Recomiendameeee', routeRecommended);
  console.log('Soy iddd', id);

  useEffect(() => {
    dispatch(getRecommended(userId));
    dispatch(reset());
    dispatch(getAllNotPage());
  }, []);

  let icon;

  switch (routeFinal?.type) {
    case 'Històrica':
      icon = (
        <Tooltip color='brown' placement='bottom' title='ruta histórica'>
          <span>
            {' '}
            <i className='fa-solid fa-building-columns'></i>
          </span>
        </Tooltip>
      );
      break;
    case 'Turística':
      icon = (
        <Tooltip color='brown' placement='bottom' title='ruta turística'>
          <span>
            {' '}
            <i className='fa-solid fa-mountain-sun'></i>
          </span>
        </Tooltip>
      );
      break;
    case 'Patrimonial':
      icon = (
        <Tooltip color='brown' placement='bottom' title='ruta Patrimonial'>
          <span>
            <i className='fa-solid fa-vihara'></i>
          </span>
        </Tooltip>
      );
      break;
    case 'Literària':
      icon = (
        <Tooltip color='brown' placement='bottom' title='ruta Literaria'>
          <span>
            <i className='fa-solid fa-book-open-reader'></i>
          </span>
        </Tooltip>
      );
      break;
    default:
      icon = 'no hay';
  }

  return (
    <div className='containerRecommended'>
      <div className='recommendedRoute'>
        <h1>Tu ruta recomendada es...</h1> <br />
        <div className='recommended'>
          <Link to={'/routes/route/' + routeFinal?._id}>
            {routeFinal?.name}
          </Link>
        </div>
      </div>
    </div>
    // <section key={routeFinal?._id} className='wrapper-ok'>
    //   <h1 className='register-title'>Tu ruta recomendada es...</h1>
    //   <div className='main-card'>
    //     <div className='card panel'>
    //       <div className='card-header'>
    //         <div className='card-header-left'>
    //           <img src={routeFinal?.image} alt='' className='picture-title' />
    //         </div>
    //         <div className='dropdown'>
    //           <span className='simbol-right dropbtn'>
    //             <Link to={'/routes/route/' + routeFinal?._id}>
    //               {routeFinal?.name}{' '}
    //             </Link>
    //           </span>
    //         </div>
    //       </div>
    //       <img src={routeFinal?.image} alt='No' className='main-picture' />
    //       <div className='bottom-container'>
    //         <div className='icon-container'>
    //           {routeFinal?.scoresId.length !== 0 ? (
    //             <span className='versionPc'>
    //               {/* <Rate allowHalf disabled defaultValue={diff} /> {diff}/
    //               {length} */}
    //             </span>
    //           ) : null}
    //           <div className='bottom-icon-left'>
    //             {routeFinal?.transport === 'peu' ? (
    //               <Tooltip color='green' title='A pie'>
    //                 <span>
    //                   {' '}
    //                   <i className='fa-solid fa-person-walking'></i>
    //                 </span>
    //               </Tooltip>
    //             ) : (
    //               <Tooltip color='green' title='En bici'>
    //                 <i className='fa-solid fa-bicycle'></i>
    //               </Tooltip>
    //             )}
    //             <span>{icon}</span>
    //           </div>
    //         </div>
    //         <div className='bottom-text-card'>
    //           <span>{routeFinal?.description_es}</span> <br />
    //           {/* {routeFinal.scoresId.length !== 0 ? (
    //             <span className='versionMobile'>
    //               <Rate disabled allowHalf defaultValue={diff} /> {diff}/
    //               {length}
    //             </span>
    //           ) : null} */}
    //           <div className='bottom-adds'>
    //             <p>
    //               {routeFinal?.difficulty !== 'NaN' ? (
    //                 <>
    //                   <span>Dificultad:</span> {routeFinal?.difficulty}{' '}
    //                 </>
    //               ) : (
    //                 <span>Dificultad no estipulada</span>
    //               )}
    //             </p>{' '}
    //             <p>
    //               <span>Duración:</span> {routeFinal?.duration}'
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default GetRecommended;
