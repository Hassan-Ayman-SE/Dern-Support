import axios from "axios";

const getAxiosInstance = () => {
    const instance = axios.create({
        baseURL: "http://localhost:3005"
    });

    return instance;
};

const fetchServices = async () => {
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.get("/common/services/getAll");
        console.log(response);
        
        return response.data;

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

export { fetchServices }

