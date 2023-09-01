import axios from "axios"


export const getData = async () => {
    try {
        const response =  await axios.get("http://localhost:4000/api/allissue").then((res) => {
            console.log(res.data);
            return res.data;
        })
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        
    }
}