import { useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { searchByType } from '../../../../features/routes/routesSlice'
import './FilterType.scss'


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