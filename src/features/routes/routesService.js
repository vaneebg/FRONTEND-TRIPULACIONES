import axios from 'axios';

const URL = process.env.REACT_APP_URL;


const getAll = async (page)=> {
  const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL+"/routes/allRoutesPage/?page="+page, {
      headers: {
        authorization: user?.user.tokens[0]
      }
    });
    return res.data
};

const getById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL + "/routes/route/" + _id, {
    headers: {
      authorization: user?.user.tokens[0]
    }
  });
  return res.data
};

const like = async(_id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(URL + '/routes/likes/' + _id, {}, {
      headers: {
          authorization: user.token,
      }
    });
  return res.data;

};

const dislike = async(_id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(URL + '/routes/dislike/' + _id, {}, {
      headers: {
          authorization: user.token,
      }
  });
  return res.data;
};
const searchByType = async (type)=> {
  const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL+"/routes/searchByType/"+type, {
      headers: {
        authorization: user?.user.tokens[0]
      }
    });
    return res.data
};

const getByTransport = async(data) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.get(URL + '/routes/search/' + data, {
      headers: {
          authorization: user.token,
      }
  });

  return res.data;
};

  const routesService = {
    getAll,
    getById,
    like,
    dislike,
    getByTransport,
    searchByType
  };
  
  export default routesService