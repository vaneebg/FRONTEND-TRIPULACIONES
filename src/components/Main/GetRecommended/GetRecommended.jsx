import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommended, reset } from '../../../features/quiz/quizSlice';
import { getAllNotPage } from '../../../features/routes/routesSlice';
import { Link } from 'react-router-dom';
import './GetRecommended.scss'


const GetRecommended = () => {
    const { userId, routeRecommended } = useSelector(state => state.quiz);
    const { routesCompleted } = useSelector(state => state.routes);
    const dispatch = useDispatch()
    const id = routeRecommended?.recommended_route_id
    const routeFinal = routesCompleted[id - 1]
    useEffect(() => {
        dispatch(getRecommended(userId))
        dispatch(reset())
        dispatch(getAllNotPage())
    }, []);


    return (
        <div className='containerRecommended'>
            <div className="recommendedRoute">
                <h1>Tu ruta recomendada es...</h1> <br />
                <div className="recommended">
                    <Link to={'/routes/route/' + routeFinal?._id}>{routeFinal?.name}</Link>
                </div>
            </div>
        </div>
    )
}

export default GetRecommended