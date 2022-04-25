import axios from "axios"
import env from '../../utils/env'

const instance = axios.create({
    baseURL: env.API_SERVER,
});

export default instance;