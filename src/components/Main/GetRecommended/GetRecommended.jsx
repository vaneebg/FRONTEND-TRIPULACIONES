import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommended ,reset} from '../../../features/quiz/quizSlice';
import { getAll } from '../../../features/routes/routesSlice';


const GetRecommended = () => {
    const { userId, routeRecommended } = useSelector(state => state.quiz);
    const { routes } = useSelector(state => state.routes);
    const dispatch = useDispatch()
console.log("rutas",routes)
    console.log(routeRecommended)
const route=routeRecommended.recommended_route_id

    useEffect(() => {
        dispatch(getRecommended(userId))
        dispatch(reset())
        dispatch(getAll())
    }, []);

    
    return (<>
    <h1>Tu ruta recomendada es...</h1>
        {route}
        </>
    )
}

export default GetRecommended