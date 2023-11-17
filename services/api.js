import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'http://192.168.43.23:8000';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json' // Set the content type to application/json
  }
});

const api = {
  post: (endpoint, data) => axiosInstance.post(endpoint, data),

};
//example usesage of calling api in react native
/* 
 const sendData = async () => {
 
    try {
      const response = await api.post(endpoint, { text });
      if (response && response.data) { // Check if 'response' and 'response.data' exist
        const data = response.data.urdu_text;
      } else {
        throw new Error('No data returned from the API');
      }
    } 
  }; */



export { api, };
