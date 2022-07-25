import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createQuiz,createQuizData,reset } from '../../../features/quiz/quizSlice';
import { Input, Radio, notification } from 'antd';
import './Quiz.scss';

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
  const { isError, isSuccess, message} = useSelector(state => state.quiz);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message });
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const { age, gender, time, route_type, price, difficulty, companions, transport } = formData;
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createQuizData(formData));
  };

  return (
    <div className='mainContainer'>
      <div className='quizzCard'>
        <form className='form-register-container' onSubmit={onSubmit}>
          <div className='text'>
            <h1 className='register-title'>Cuestionario</h1>
            <p>Rellena este cuestionario para descubrir cuál es tu ruta ideal ;)</p>
          </div>
          <br />
          <div className='quizz'>
            <div className='question'>
              <label htmlFor='age'>Año de nacimiento:</label>
              <Input
                type='number'
                className='numberIn'
                placeholder='1985'
                name='age'
                value={age}
                onChange={onChange}
              />
            </div>
            <br />
            <div className='question'>
              <label htmlFor='gender'>Género:</label>
              <Radio.Group className='RadioGroup' onChange={(e) => setFormData(prevState => ({ ...prevState, gender: e.target.value }))}>
                <Radio name={gender} value="hombre" >Hombre</Radio>
                <Radio name={gender} value="mujer">Mujer</Radio>
                <Radio name={gender} value="otro" >Otro</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className='question'>
              <label htmlFor='time'>Duración de la ruta:</label>
              <Input
                type='number'
                className='numberIn'
                placeholder='30 (minutos)'
                name='time'
                value={time}
                onChange={onChange}
                min='30'
                max='480'
              />
            </div>
            <br />
            <div className='question'>
              <label htmlFor='route_type'>Tipo de ruta:</label>
              <Radio.Group className='RadioGroup' onChange={(e) => setFormData(prevState => ({ ...prevState, route_type: e.target.value }))} >
                <Radio name={route_type} value="historica" >Histórica</Radio>
                <Radio name={route_type} value="turistica" >Turística</Radio>
                <Radio name={route_type} value="literaria" >Literaria</Radio>
                <Radio name={route_type} value="patrimonio" >Patrimonio</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className='question'>
              <label htmlFor='companions'>Compañía:</label>
              <Radio.Group className='RadioGroup' onChange={(e) => setFormData(prevState => ({ ...prevState, companions: e.target.value }))}  >
                <Radio name={companions} value="solo">Solo</Radio>
                <Radio name={companions} value="pareja">En pareja</Radio>
                <Radio name={companions} value="familia">En familia</Radio>
                <Radio name={companions} value="amigos">Amigos</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className='question'>
              <label htmlFor='price'>Rango de precios:</label>
              <Radio.Group className='RadioGroup' onChange={(e) => setFormData(prevState => ({ ...prevState, price: e.target.value }))} >
                <Radio name={price} value="gratis" >Gratis</Radio>
                <Radio name={price} value="1-50" >1-50€</Radio>
                <Radio name={price} value="+50" >+50€</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className='question'>
              <label htmlFor='difficulty'>Dificultad:</label>
              <Radio.Group className='RadioGroup' onChange={(e) => setFormData(prevState => ({ ...prevState, difficulty: e.target.value }))} >
                <Radio name={difficulty} value="alta" >Alta</Radio>
                <Radio name={difficulty} value="baja" >Baja</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className='question'>
              <label htmlFor='transport'>Transporte:</label>
              <Radio.Group className='RadioGroup' onChange={(e) => setFormData(prevState => ({ ...prevState, transport: e.target.value }))}  >
                <Radio name={transport} value="a pie" >A pie</Radio>
                <Radio name={transport} value="bicicleta" >Bicicleta</Radio>
              </Radio.Group>
            </div>
            <br />
            <div className='buttonContainer'>
              <input type="submit" className='button' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Quiz