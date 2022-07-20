import { notification } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { reset, getById } from '../../../../../features/routes/routesSlice'

const RouteDetail = () => {
    const { _id } = useParams();

    const dispatch = useDispatch();

    const { route, isError, isSuccess, message } = useSelector((state) => state.routes);

    const pois = route.pois?.map(poi => {
        return (
            <div key={pois.id}>
                {poi.name}
            </div>
        )
    })

    useEffect(() => {
        dispatch(getById(_id))
    }, []);

    useEffect(() => {
        if (isError) {
            notification.error({
                message: "Error",
                description: message
            })
        }
        if (isSuccess) {
            notification.success({
                message: "Success",
                description: message
            })
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])

    return (
        <div className="routeDetail">
            <h3>{route.name}</h3>
            <img src={route.imagepath} alt="" />
            <p>{route.dificulty}</p>
            <p>{route.duration}</p>
            <p>{route.description}</p>
            <p>{route.startingPoint}</p>
            <p>{route.endingPoint}</p>
            <p>{route.pois}</p>
        </div>
    )
}

export default RouteDetail