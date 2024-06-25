import axios from 'axios';
import { API_URL } from 'src/shared/constants/env';

export const api = axios.create({
    baseURL: API_URL,
});
