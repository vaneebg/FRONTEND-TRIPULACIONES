import { useSelector } from "react-redux";
import './Route.scss'


const Route = () => {
    const { routes } = useSelector((state) => state.routes);


const route=routes.map(el=>{return(

<div className="route">
<span>Nombre ruta:{el.name}</span> <br />
<span>Descripción: {el.description}</span> <br />
<span>Dificultad: {el.difficulty}</span> <br />
<img src={el.image} alt="" />

</div>
)})
 
    return (<div className="container">
        {route}
        </div>
    )
}

export default Route