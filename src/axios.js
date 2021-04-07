import axios from "axios";

const instance = axios.create({
    baseURL: 'http://157.230.214.200:3000'
});


instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'

export default instance