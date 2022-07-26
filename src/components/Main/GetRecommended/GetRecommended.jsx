import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommended, reset } from '../../../features/quiz/quizSlice';
import { getAllNotPage } from '../../../features/routes/routesSlice';
import { Link } from 'react-router-dom';



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


    return (<>
        <h1>Tu ruta recomendada es...</h1> <br />
        <Link to={'/routes/route/' + routeFinal?._id}>{routeFinal?.name}</Link>
    </>
    )
}

export default GetRecommended