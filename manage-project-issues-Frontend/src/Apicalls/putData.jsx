import axios from "axios"

export const updateIssue =  async (id, issueData) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/updateIssue/${id}`, issueData).then((res) => {
            return res.data;
        })
        if (response.success) {
            return response;
        }
    } catch (error) {
        
    }
}