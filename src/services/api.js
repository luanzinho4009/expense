import axios from 'axios';


const api = axios.create({
  baseURL : "https://sofit-front-challenge.herokuapp.com/",
})

export default api;