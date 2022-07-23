import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { getById } from "../../../../../features/routes/routesSlice";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle
} from "react-leaflet";
import Comments from "../../Comments/Comments";
import Scores from "./Scores/Scores";
import Score from "./Scores/Score/Score"
import { getAll } from "../../../../../features/comments/commentsSlice";
const styles = {
  wrapper: {
    height: 400,
    width: "80%",
    margin: "0 auto",
    display: "flex",
  },
  map: {
    flex: 1,
  },
};

const Options = { color: 'rgb(127, 168, 255)' };


const RouteDetail = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  const { route } = useSelector((state) => state.routes);

  useEffect(() => {
    dispatch(getById(_id));
  }, []);

  const pointsMap = route.poi?.map((point) => {
    return (
      <Marker position={[point?.longitude, point?.latitude]}>
        <Popup>
          {point?.name} <br />
        </Popup>
      </Marker>
    );
  });
  // const pointsLine = route.poi?.map((point) => {
  //   return (

  //     [point?.longitude, point?.latitude]

  //   );
  // });
  const pointsInfo = route.poi?.map((point) => {
    return (<div key={point._id} className='poiDesc'>
      <span>Punto: {point?.name}</span> <br />
      <span>Descripción: {point?.description_es}</span>
    </div>
    );
  });
  return (
    <>
      <div className="routeDetail">
        <h3>{route?.name}</h3>
        <img src={route?.image} alt="" />
        <p>{route?.dificulty}</p>
        <p>{route?.duration}</p>
        <p>{route?.description_es}</p>
        <p>{route?.startingPoint}</p>
        <p>{route?.endingPoint}</p>
        <div style={styles.wrapper}>
          <MapContainer
            style={styles.map}
            center={[39.46975, -0.37739]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              url={"https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"}
            />
            {pointsMap}
            {/* <Polyline pathOptions={Options} positions={pointsLine} /> */}
          </MapContainer>
        </div>
        <>
          {pointsInfo}
          <Scores routeId={route._id} />
          <Score />
          <Comments />
        </>
      </div>

    </>
  );
};

export default RouteDetail;
