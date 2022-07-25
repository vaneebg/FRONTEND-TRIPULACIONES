import { searchByType } from '../../../../features/routes/routesSlice'
import './FilterType.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const FilterType = () => {
    useEffect(() => {
        searchByType()
    }, []);
    const dispatch = useDispatch()
    return (
        <div className='buttonType'>
            <button onClick={() => dispatch(searchByType('Històrica'))}>Histórica</button>
            <button onClick={() => dispatch(searchByType('Turística'))}>Turística</button>
            <button onClick={() => dispatch(searchByType('Literària'))}>Literaria</button>
            <button onClick={() => dispatch(searchByType('Patrimonial'))}>Patrimonial</button>
        </div>
    )
}

export default FilterType