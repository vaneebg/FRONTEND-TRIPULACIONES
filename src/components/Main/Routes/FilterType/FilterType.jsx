import { useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { searchByType } from '../../../../features/routes/routesSlice'
import { Button } from "antd"

import './FilterType.scss'


const FilterType = () => {
    useEffect(() => {
        searchByType()
    }, []);
    const dispatch = useDispatch()
    return (
        <div className='buttonType'>
            <Button onClick={() => dispatch(searchByType('Històrica'))}>Histórica</Button>
            <Button onClick={() => dispatch(searchByType('Turística'))}>Turística</Button>
            <Button onClick={() => dispatch(searchByType('Literària'))}>Literaria</Button>
            <Button onClick={() => dispatch(searchByType('Patrimonial'))}>Patrimonial</Button>
        </div>
    )
}

export default FilterType