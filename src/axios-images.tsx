import axios from 'axios';

const instance = axios.create({
    proxy: {
        host: 'https://latelier.co/data/',
        port: 80
      }
});

export default instance;