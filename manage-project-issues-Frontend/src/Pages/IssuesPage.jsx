import React, { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { deleteData } from "../Apicalls/DeleteData";
import { updateIssue } from "../Apicalls/putData";
import { getData } from "../Apicalls/getData";


const IssuesPage = ({dataIssues, setDataIssues}) => {
    const [modifyIssue, setModifyIssue] = useState({
    })

    const setUpdate = (e, val, name) => {
        setModifyIssue({...modifyIssue, [name]: e.target.textContent})   
    }

    const handleUpdate = (id) => {
        updateIssue(id, modifyIssue).then((data) => {
            console.log(data);
        });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
                deleteData(id).then((data) => {
                    console.log(data)
                    if(data){
                        getData().then((data) => {
                            setDataIssues(data);
                          });
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            }
          })
    }

    return (
        <div className="flex justify-center align-center mt-[4rem]">
            <table className="">
                <tr>
                    <th>
                        name
                    </th>
                    <th>
                        title
                    </th>
                    <th>
                        desc
                    </th>
                    <th className="px-4">
                        priority
                    </th>
                    <th className="px-4">
                        edit
                    </th>
                    <th className="px-4">
                        delete
                    </th>
                </tr>
                {
                    dataIssues && dataIssues.length > 0 ? dataIssues.map((val, key) => {
                        return (
                            
                            <tr key={key} className="">
                                <td className="px-5" onKeyUp={(e) => setUpdate(e, val, "projectName")} contentEditable="true">{val.projectName}</td>
                                <td className="px-5" onKeyUp={(e) => setUpdate(e, val, "projectTitle")} contentEditable="true">{val.projectTitle}</td>
                                <td className="px-5" onKeyUp={(e) => setUpdate(e, val, "projectDesc")} contentEditable="true">{val.projectDesc}</td>
                                <td onKeyUp={(e) => setUpdate(e, val, "priority")} contentEditable="true">{val.priority}</td>
                                <td className="cursor-pointer ps-4" onClick={() => handleUpdate(val.id)}><FaCheck /></td>
                                <td className="cursor-pointer ps-6" onClick={() => handleDelete(val.id)}><FaTrash /></td>
                            </tr>
                        )
                    }) : ""
                }
            </table>
        </div>
    )
}

export default IssuesPage;