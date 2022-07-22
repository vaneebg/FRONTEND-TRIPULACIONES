import axios from "axios";


const URL = process.env.REACT_APP_URL;

const createComment = async (comment) => {
  console.log(comment)
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
console.log(res.data)

return res.data;
}

const getAll = async(page) =>{
  console.log(page)
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL+"/comments/allCommentsPage/?page="+page , {
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