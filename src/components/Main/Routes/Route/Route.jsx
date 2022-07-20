import { useSelector } from "react-redux";
// import { MapContainer, TileLayer, Marker, Popup , Polyline} from 'react-leaflet';
import './Route.scss'


// const styles = {
//     wrapper: {
//         height: 400,
//         width: '80%',
//         margin: '0 auto',
//         display: 'flex'
//     },
//     map: {
//         flex: 1
//     }
// };
// const polyline = [
//     [39.48, -0.36],
//     [39.4894, -0.364],
//     [39.47, -0.369],
//   ]
// const blackOptions = { color: 'black' }



const Route = () => {

    const { routes } = useSelector((state) => state.routes);

    const route = routes.map(el => {
        // const points = el.pois.map(point => {
        //     return (
        //         <Marker position={[point.latitude, point.longitude]}>
        //             <Popup>
        //                 {point.name} <br />
        //             </Popup>
        //         </Marker>
        //     )
        // })
        return (

            <div key={el.id} className="route">
                <span>Nombre ruta:{el.name}</span> <br />
                <span>Descripción: {el.description}</span> <br />
                <span>Dificultad: {el.difficulty}</span> <br />
                <span>Duración del trayecto: {el.duration}</span>
                <img src={el.image} alt="" />
                {/* <div style={styles.wrapper}>

                    <MapContainer style={styles.map} center={[39.46975, -0.37739]} zoom={13}>
                        <TileLayer url={'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'} />
                        {points}
                        <Polyline pathOptions={blackOptions} positions={polyline} />
                    </MapContainer>
                </div> */}
            </div>
        )
    })

    return (
        <div className="container">
            {route}
        </div>
    )
}
export default Route