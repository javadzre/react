import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.response.use(null, error => {
    const expctedErrors = error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expctedErrors) {
        console.log(expctedErrors)
        toast.error("مشکلی از سمت سرور است", {

            position: "top-left "
        });
    }
    return Promise.reject(error);
})





export default {
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    get : axios.get,
}   