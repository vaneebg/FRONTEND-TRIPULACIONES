import axios from "axios";


const URL = process.env.REACT_APP_URL;
console.log("url",URL)
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
  console.log(res.data)
  return res.data;
}


const quizService = {
  createQuiz,
  createQuizData
};

export default quizService;