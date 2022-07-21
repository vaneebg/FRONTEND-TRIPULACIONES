import axios from "axios";


const URL = process.env.REACT_APP_URL;

const createComment = async (comment) => {
    const { body, routeId } = comment
    const data = {
      body: body
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(URL + "/comments/route/" + routeId, data, {
      headers: {
        authorization: user?.token,
      },        
});

return res.data;
}

const getAll = async() =>{
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL+"/comments/allCommentsPage", {
    headers:{
      authorization: user?.token
    }
  })
  console.log(res.data)
  return res.data
}

const commentsService = {
    createComment,
    getAll
  };

export default commentsService;