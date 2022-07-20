import Route from "./Route/Route"
<<<<<<< HEAD
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAll, reset } from "../../../features/routes/routesSlice"
import { Skeleton } from "antd"
=======
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/routes/routesSlice";
import { Skeleton } from "antd";
>>>>>>> 58385c6afc5ef4954f907260eccc83c036f14b0e
import './Routes.scss'

const Routes = () => {

  const { isLoading } = useSelector((state) => state.routes);

<<<<<<< HEAD
  const dispatch = useDispatch();
=======

  const [current, setCurrent] = useState(1);
>>>>>>> 58385c6afc5ef4954f907260eccc83c036f14b0e

  const getRoutesAndReset = async () => {
    await dispatch(getAll(current));
    dispatch(reset())
  };

  useEffect(() => {
    getRoutesAndReset()
  }, [getAll]);

<<<<<<< HEAD
=======

>>>>>>> 58385c6afc5ef4954f907260eccc83c036f14b0e
  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} />;
  }
  return (
    <div className="main">
      <h2>Rutas</h2>
      <Route pageC={current} functionPage={setCurrent} />
    </div>
  )
}

export default Routes