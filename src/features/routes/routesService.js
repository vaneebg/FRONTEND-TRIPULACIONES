import axios from 'axios';

const URL = process.env.REACT_APP_URL;


const getAll = async ()=> {
  const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL+"/routes/", {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    return res.data;

   }
  const routesService = {
    getAll
  };
  
  export default routesService;
  