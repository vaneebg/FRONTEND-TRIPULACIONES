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

const getQuiz = async () => {
  const res = await axios.get(URL + "/quiz/")
  return res.data
}


const quizService = {
  createQuiz,
  getQuiz,
};

export default quizService;