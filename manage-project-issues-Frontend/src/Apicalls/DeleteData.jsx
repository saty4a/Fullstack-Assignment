import axios from "axios"


export const deleteData = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/issue/${id}`).then((res) => {
        console.log(res);
        return res.data
    })
    if (response.success) {
        return response.success;
    }
    } catch (error) {
        
    }
}