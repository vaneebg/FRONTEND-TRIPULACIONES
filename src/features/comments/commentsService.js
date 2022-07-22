import axios from "axios";


const URL = process.env.REACT_APP_URL;

const createComment = async (data) => {
    const { editedData, routeId } = data
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(URL + "/comments/route/" + routeId, editedData, {
      headers: {
        authorization: user?.token,
      },        
});

console.log(res.data)
return res.data;
}

const getAll = async() =>{
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL+"/comments/" , {
    headers:{
      authorization: user?.token
    }
  })
  return res.data
}

const commentsService = {
    createComment,
    getAll
  };

export default commentsService;