import { useSelector } from "react-redux";
import { MapContainer, TileLayer } from 'react-leaflet';
import './Route.scss'


const styles = {
    wrapper: {
        height: 400,
        width: '80%',
        margin: '0 auto',
        display: 'flex'
    },
    map: {
        flex: 1
    }
};


const Route = () => {

    const { routes } = useSelector((state) => state.routes);


    const route = routes.map(el => {
        return (

            <div className="route">
                <span>Nombre ruta:{el.name}</span> <br />
                <span>Descripción: {el.description}</span> <br />
                <span>Dificultad: {el.difficulty}</span> <br />

                <div style={styles.wrapper}>
                    <MapContainer style={styles.map} center={[39.46975, -0.37739]} zoom={13}>
                        <TileLayer url={'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'} />
                    </MapContainer>
                </div>
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