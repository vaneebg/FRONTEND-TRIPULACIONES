import axios from "axios";


const URL = process.env.REACT_APP_URL;

const createComment = async (comment) => {
    const { formData, postId } = comment
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post(URL + "/comments/", comment, {
      headers: {
        authorization: user?.token,
      },        
});
}

const commentsService = {
    createComment,
  };

export default commentsService;