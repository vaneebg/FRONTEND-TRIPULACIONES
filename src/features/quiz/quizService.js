import axios from "axios";

const URL = process.env.REACT_APP_URL;

const createQuiz = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(URL + "/quiz/", data, {
    headers: {
      authorization: user?.user.tokens[0],
    },
  }
  );
  return res.data;
}

const createQuizData = async (data) => {
  const { age, companions, difficulty, gender, price, route_type, time, transport } = data
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(`https://api-routes-data.herokuapp.com/postUser/?age=${age}&gender=${gender}& time=${time}&route_type=${route_type}&price=${price}&difficulty=${difficulty}&companions=${companions}&transport=${transport}`, {
    headers: {
      authorization: user?.user.tokens[0],
    },
  }
  );
  console.log('respuesta del create del quiz',res.data)
  return res.data;
}
const getRecommended = async (userId) => {
  console.log(userId)
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get('https://api-routes-data.herokuapp.com/getRecommendation/?id=' + userId, {
    headers: {
      authorization: user?.user.tokens[0],
    },
  }
  );
  console.log('soy el service de los de Data, traigo id de ruta recomendada',res.data)
  return res.data;
}


const quizService = {
  createQuiz,
  createQuizData,
  getRecommended
};

export default quizService;