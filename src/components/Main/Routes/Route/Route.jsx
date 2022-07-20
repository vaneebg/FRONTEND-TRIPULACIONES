import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import './Route.scss'
import { Pagination} from 'antd';
import { getAll } from "../../../../features/routes/routesSlice";






const Route = ({ pageC, functionPage }) => {

    const { routes, numberRoutes } = useSelector((state) => state.routes);
    const dispatch=useDispatch()
    const onChange = (page) => {
        functionPage(page);
        dispatch(getAll(page))
      };
    const route = routes?.map(el => {
      
        return (

            <div key={el._id} className="route">
                <Link to={"/routes/route/" + el._id}>
                    <span>{el.name}</span> <br />
                </Link>
                <span>Descripción: {el.description}</span> <br />
                <span>Dificultad: {el.difficulty}</span> <br />
                <span>Duración del trayecto: {el.duration}</span>
                <img src={el.image} alt="" />
             
            </div>
        )
    })

    return (
        <div className="container">
             <Pagination
      total={numberRoutes}
      current={pageC}
      onChange={onChange}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={10}
      defaultCurrent={1}
    />
    {route}
    <Pagination
      current={numberRoutes}
      total={30}
      onChange={onChange}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={10}
      defaultCurrent={1}
    />
        </div>
    )
}
export default Route