import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getById } from '../../../../../features/routes/routesSlice';
import Comments from '../../Comments/Comments';
import Scores from './Scores/Scores';
import Score from './Scores/Score/Score';
import { Timeline } from 'antd';
import { PlaySquareOutlined, FlagOutlined } from '@ant-design/icons';
import './RouteDetail.scss';

const RouteDetail = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  const { route } = useSelector(state => state.routes);

  useEffect(() => {
    dispatch(getById(_id));
  }, [getById]);

  const pointsMap = route.poi?.map((point, i) => {
    return (
      <Marker key={i} position={[point?.longitude, point?.latitude]}>
        <Popup>
          {point?.name} <br />
        </Popup>
      </Marker>
    );
  });

  const pointsInfo = route.poi?.map(point => {
    return (
      <div key={point._id} className='poiDesc'>
        <Timeline>
          <Timeline.Item color='red'><b>{point?.name}</b></Timeline.Item>
          <Timeline.Item color='green'>{point?.description_es}</Timeline.Item>
        </Timeline>
      </div>
    );
  });

  return (
    <>
      <div className='routeDetail'>
        <h3 className='routeDet-title'>{route?.name}</h3>
        <div className='hola'>
          <img className='imgRouteDetail' src={route?.image} alt='' />
          <p>{route?.description_es}</p>
        </div>
          {route?.startingPoint!=='NaN' ?  <p>
          <PlaySquareOutlined className='race-point' />
          {route?.startingPoint}
        </p> : null}
        {route?.endingPoint!=='NaN' ? <p>
          <FlagOutlined className='race-point' />
          {route?.endingPoint}
        </p> :null}
       
        <div className='styleWrapper'>
          <MapContainer
            className='stylesMap'
            center={[39.46975, -0.37739]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              url={'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'}
            />
            {pointsMap}
          </MapContainer>
        </div>
        <>
          <h3 className='route-detail-tit'>Puntos de interés</h3>
          <div className='puntos-estilo'>{pointsInfo}</div>
          <h3 className='route-detail-tit'>Valora la ruta</h3>
          <Scores routeId={route._id} />
          <Score />
          <h3 className='route-detail-tit-last'>
            ¿Quieres añadir un comentario?
          </h3>
          <Comments />
        </>
      </div>
    </>
  );
};

export default RouteDetail;
