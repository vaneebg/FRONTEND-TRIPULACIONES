import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommended ,reset} from '../../../features/quiz/quizSlice';


const GetRecommended = () => {
    const { userId, routeRecommended } = useSelector(state => state.quiz);
    const dispatch = useDispatch()

const route=routeRecommended.recommended_route

    useEffect(() => {
        dispatch(getRecommended(userId))
        dispatch(reset())
    }, []);

    
    return (<>
    <h1>Tu ruta recomendada es...</h1>
        {route}
        </>
    )
}

export default GetRecommended