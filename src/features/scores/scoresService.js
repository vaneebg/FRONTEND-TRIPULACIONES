import axios from "axios";


const URL = process.env.REACT_APP_URL;

const createScore = async (data) => {
    const { score, routeId } = data
   const scoreFinal={score:score}
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(URL + "/scores/route/" + routeId,scoreFinal, {
      headers: {
        authorization: user?.user.tokens[0]
      },        
});

console.log("resdata",res.data)
return res.data;
}

const getAllScores = async() =>{
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL+"/scores/" , {
    headers:{
      authorization: user?.token
    }
  })
  return res.data
}

const scoresService = {
    createScore,
    getAllScores
  };

export default scoresService;