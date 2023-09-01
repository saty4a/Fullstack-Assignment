import axios from "axios"

export const postData = async (issueData) => {
    try {
        const response  = await axios.post("http://localhost:4000/api/issue", issueData)
        .then((data) => {
            return data;
        })
        if (response) {
            return response
        }
    } catch (error) {
        
    }
}