import {
  Button,
  Input,
  Form,
  Radio,

} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import './Quiz.scss'
import { createQuiz } from '../../../features/quiz/quizSlice';

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
  console.log(formData)
      dispatch(createQuiz(formData));
    

  };
  return (
<div className='register-container'>
    <form className='form-register-container' onSubmit={onSubmit}>
    <h2 className='register-title'>Formulario:</h2>
      <label htmlFor='age'>Año de nacimiento:</label>
      <Input
        type='number'
        className='numberIn'
        name='age'
        value={age}
        onChange={onChange}
       
      />
     <br />
      <label htmlFor='gender'>Género:</label>
      <Radio.Group  onChange={(e) => setFormData(prevState=>({...prevState,gender: e.target.value}))}> 
          <Radio name={gender} value="hombre" >Hombre</Radio>
          <Radio  name={gender} value="mujer">Mujer</Radio>
          <Radio  name={gender} value="otro" >Otro</Radio>
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
      
      /> <br />
       <label htmlFor='route_type'>Tipo de ruta:</label>
      <Radio.Group   onChange={(e) => setFormData(prevState=>({...prevState,route_type: e.target.value}))} >
          <Radio name={route_type} value="historica" >Histórica</Radio>
          <Radio  name={route_type} value="turistica" >Turística</Radio>
          <Radio  name={route_type} value="literaria" >Literaria</Radio>
          <Radio  name={route_type} value="patrimonio" >Patrimonio</Radio>

        </Radio.Group>
        <br />
        <label htmlFor='companions'>Compañía:</label>
      <Radio.Group  onChange={(e) => setFormData(prevState=>({...prevState,companions: e.target.value}))}  >
          <Radio name={companions} value="solo">Solo</Radio>
          <Radio  name={companions} value="pareja">En pareja</Radio>
          <Radio  name={companions} value="familia">En familia</Radio>
          <Radio  name={companions} value="amigos">Amigos</Radio>

        </Radio.Group>
        <br />
        <label htmlFor='price'>Rango de precios:</label>
      <Radio.Group   onChange={(e) => setFormData(prevState=>({...prevState,price: e.target.value}))} >
          <Radio name={price} value="gratis" >Gratis</Radio>
          <Radio  name={price} value="1-50" >1-50€</Radio>
          <Radio  name={price} value="+50" >+50€</Radio>
        </Radio.Group>
        <br />
        <label htmlFor='difficulty'>Dificultad:</label>
      <Radio.Group   onChange={(e) => setFormData(prevState=>({...prevState,difficulty: e.target.value}))} >
          <Radio name={difficulty} value="alta" >Alta</Radio>
          <Radio  name={difficulty} value="baja" >Baja</Radio>
        </Radio.Group>
        <br />
        <label htmlFor='transport'>Transporte:</label>
      <Radio.Group  onChange={(e) => setFormData(prevState=>({...prevState,transport: e.target.value}))}  >
          <Radio name={transport} value="a pie" >A pie</Radio>
          <Radio  name={transport} value="bicicleta" >Bicicleta</Radio>
        </Radio.Group>
     <input type="submit" />
    </form>
    </div>

  )
}

export default Quiz