import axios from 'axios';
import { BACKEND_URL } from './config/constants';

const instance = axios.create({
    baseURL: BACKEND_URL
});

export default instance;