import {
  Button,
  Input,
  Form,
  Radio,

} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import './Quiz.scss'

const Quiz = () => {
  const initialState = {
    age: '',
    gender: '',
    time: '',
    route_type: '',
    price: '',
    difficulty: '',
    companions: '',
    transport: ''
  };

  const [formData, setFormData] = useState(initialState);
const dispatch=useDispatch()
  const { age,gender,time,route_type,price,difficulty,companions,transport } = formData;
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
  
      const formData = new FormData();
      formData.set('age', e.target.age.value);
      formData.set('gender', e.target.gender.value);
      formData.set('time', e.target.time.value);
      formData.set('route_type', e.target.route_type.value);
      formData.set('price', e.target.price.value);
      formData.set('difficulty', e.target.difficulty.value);
      formData.set('companions', e.target.companions.value);
      formData.set('transport', e.target.transport.value);
      // dispatch(quiz(formData));
      setFormData(initialState);
    

  };
  return (
<div className="container">
    <form className='form' onSubmit={onSubmit}>
    <span className='titleForm'>Formulario:</span>
      <label htmlFor='age'>Edad:</label>
      <Input
        type='number'
        className='numberIn'
        name='age'
        value={age}
        onChange={onChange}
        required
      />
     <br />
      <label htmlFor='genre'>Género:</label>
      <Radio.Group   >
          <Radio name={gender} value="hombre" onChange={onChange}>Hombre</Radio>
          <Radio  name={gender} value="mujer" onChange={onChange}>Mujer</Radio>
          <Radio  name={gender} value="otro" onChange={onChange}>Otro</Radio>
        </Radio.Group>
<br />
        <label htmlFor='genre'>Duración de la ruta:</label>
     <Input
        type='number'
        className='numberIn'
        placeholder='30'
        name='time'
        value={time}
        onChange={onChange}
        min='30'
        max='480'
        required
      /> <br />
       <label htmlFor='route_type'>Tipo de ruta:</label>
      <Radio.Group   >
          <Radio name={route_type} value="historica" onChange={onChange}>Histórica</Radio>
          <Radio  name={route_type} value="turistica" onChange={onChange}>Turística</Radio>
          <Radio  name={route_type} value="literaria" onChange={onChange}>Literaria</Radio>
          <Radio  name={route_type} value="patrimonio" onChange={onChange}>Patrimonio</Radio>

        </Radio.Group>
        <br />
        <label htmlFor='companions'>Compañía:</label>
      <Radio.Group   >
          <Radio name={companions} value="solo" onChange={onChange}>Solo</Radio>
          <Radio  name={companions} value="pareja" onChange={onChange}>En pareja</Radio>
          <Radio  name={companions} value="familia" onChange={onChange}>En familia</Radio>
          <Radio  name={companions} value="amigos" onChange={onChange}>Otros</Radio>

        </Radio.Group>
        <br />
        <label htmlFor='price'>Rango de precios:</label>
      <Radio.Group   >
          <Radio name={price} value="gratis" onChange={onChange}>Gratis</Radio>
          <Radio  name={price} value="1-50" onChange={onChange}>1-50€</Radio>
          <Radio  name={price} value="+50" onChange={onChange}>+50€</Radio>
        </Radio.Group>
        <br />
        <label htmlFor='difficulty'>Dificultad:</label>
      <Radio.Group   >
          <Radio name={difficulty} value="alta" onChange={onChange}>Alta</Radio>
          <Radio  name={difficulty} value="baja" onChange={onChange}>Baja</Radio>
        </Radio.Group>
        <br />
        <label htmlFor='transport'>Transporte:</label>
      <Radio.Group   >
          <Radio name={transport} value="a pie" onChange={onChange}>A pie</Radio>
          <Radio  name={transport} value="bicicleta" onChange={onChange}>Bicicleta</Radio>
        </Radio.Group>
     
    </form>
    </div>

  )
}

export default Quiz