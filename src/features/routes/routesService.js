import axios from 'axios';

const URL = process.env.REACT_APP_URL;


const getAll = async (page)=> {
  const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL+"/routes/allRoutesPage/?page="+page, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    console.log("res.data",res.data)
    return res.data;

   }
  const routesService = {
    getAll
  };
  
  export default routesService;
  