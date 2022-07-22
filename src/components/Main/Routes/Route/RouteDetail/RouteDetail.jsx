import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../../features/routes/routesSlice";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import Comments from "../../Comments/Comments";

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
const polyline = [
  [39.48, -0.36],
  [39.4894, -0.364],
  [39.47, -0.369],
];
const blackOptions = { color: "black" };

const RouteDetail = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  const { route } = useSelector((state) => state.routes);

  useEffect(() => {
    dispatch(getById(_id));
  }, []);

    useEffect(() => {
        dispatch(getById(_id))
    }, []);

  const points = route.poi?.map((point) => {
    return (
      <Marker position={[point.latitude, point.longitude]}>
        <Popup>
          {point.name} <br />
        </Popup>
      </Marker>
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
          >
            <TileLayer
              url={"https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"}
            />
            {points}

            <Polyline pathOptions={blackOptions} positions={polyline} />
          </MapContainer>
        </div>
        <>
      <Comments />
      </>
      </div>

    </>
  );
};

export default RouteDetail;
