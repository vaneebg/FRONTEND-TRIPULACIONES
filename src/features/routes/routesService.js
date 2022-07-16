import axios from 'axios';

const getAll = async ()=> {
    const res = await axios.get("https://pilgrimtests.000webhostapp.com/mockapi/getall/");
    return res.data
  };


  const routesService = {
    getAll
  };
  
  export default routesService;
  