import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getById } from '../../../../../features/routes/routesSlice'

const RouteDetail = () => {
    const { _id } = useParams();

    const dispatch = useDispatch();

    const { route } = useSelector((state) => state.routes);
    console.log(route)
    useEffect(() => {
        dispatch(getById(_id))
    }, []);

    return (
        <div className="routeDetail">
            <h3>{route.name}</h3>
            <img src={route.imagepath} alt="" />
            <p>{route.dificulty}</p>
            <p>{route.duration}</p>
            <p>{route.description}</p>
            <p>{route.startingPoint}</p>
            <p>{route.endingPoint}</p>
            {/* <p>{route.pois}</p> */}
        </div>
    )
}

export default RouteDetail