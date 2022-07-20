import Route from "./Route/Route"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/routes/routesSlice";
import { notification } from "antd";
import './Routes.scss'

const Routes = () => {

  const { isLoading } = useSelector((state) => state.routes);
  const dispatch = useDispatch()

  console.log(isLoading)
  useEffect(() => {
    if (isLoading) {
      console.log("entra", isLoading);
      <span>HOLAAAAAAAAAAA</span>
    }
  }, [isLoading]);


  const getRoutesAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset())
  };

  useEffect(() => {
    getRoutesAndReset();
  }, [getAll]);
  return (
    <div className="main">
      <h2>Rutas</h2>
      <Route />
    </div>
  )
}

export default Routes