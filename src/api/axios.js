import axios from "axios";


const client = axios.create({
    baseURL: "https://clothe-store-backend.onrender.com/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
    },
});


client.interceptors.response.use(response => response,
    async error => {
        if (error.response.status === 501) {
            console.log("error");
            return axios(error.cofig);
        }
        return Promise.reject(error);
    }
)

client.interceptors.request.use(config => {
    const authToken = localStorage.getItem('auth');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

export default client;