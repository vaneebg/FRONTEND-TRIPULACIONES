import { useEffect} from 'react';
import { useDispatch  } from 'react-redux';
import { getByTransport } from '../../../../../features/routes/routesSlice';
import { Button } from "antd"

import './Filter.scss'


const Filter = () => {
 

  const dispatch = useDispatch()
 
  useEffect(() => {
    getByTransport()
  },[])
 
  return (
    <div className="buttonTransport">
       <Button onClick={() => dispatch(getByTransport("bicicleta"))}>Bici</Button>
        <Button onClick={() => dispatch(getByTransport("peu"))}>A pie</Button>
    </div>
  )
}

export default Filter