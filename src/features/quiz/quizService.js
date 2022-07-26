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
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post('https://api-routes-data.herokuapp.com/postUser/', data, {
    headers: {
      authorization: user?.user.tokens[0],
    },
  }
  );
  return res.data;
}
const getRecommended = async (userId) => {
  console.log('soy la id del usuario que me envia data',userId)
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get('https://api-routes-data.herokuapp.com/getRecommendation/?id='+userId, {
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