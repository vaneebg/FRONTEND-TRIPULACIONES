import Route from "./Route/Route"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/routes/routesSlice";
import { notification } from "antd";

const Routes = () => {

  const dispatch = useDispatch()

  const getRoutesAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset())
  };

  useEffect(() => {
    getRoutesAndReset();
  }, [getAll]);

  return (
    <>
      <h2>Rutas</h2>
      <Route />
    </>
  )
}

export default Routes