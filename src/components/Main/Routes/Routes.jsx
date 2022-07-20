import Route from "./Route/Route"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/routes/routesSlice";
import { Skeleton } from "antd";
import './Routes.scss'

const Routes = () => {

  const { isLoading } = useSelector((state) => state.routes);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);

  const getRoutesAndReset = async () => {
    await dispatch(getAll(current));
    dispatch(reset())
  };

  useEffect(() => {
    getRoutesAndReset()
  }, [getAll]);

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