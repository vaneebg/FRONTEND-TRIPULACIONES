import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommended } from '../../../features/quiz/quizSlice';

const GetRecommended = () => {
    const { userId, routeRecommended } = useSelector(state => state.quiz);
    const dispatch = useDispatch()

console.log("userId en componente",routeRecommended)
const route=routeRecommended.recommended_route

    useEffect(() => {
        dispatch(getRecommended(userId))
    }, []);
    
    return (<>
        {route}
        </>
    )
}

export default GetRecommended