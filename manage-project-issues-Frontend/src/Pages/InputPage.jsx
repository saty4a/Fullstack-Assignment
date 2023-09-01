import React, { useState } from "react";
import { postData } from "../Apicalls/postData";

const InputForms = ({setShowData}) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectTitle: "",
    projectDesc: "",
    priority: 0,
  });

  const handleSubmit = () => {
    if (
      projectData.projectName === "" ||
      projectData.projectTitle === "" ||
      projectData.projectDesc === "" ||
      projectData.priority <= 0
    ) {
        alert("All fields are required and priority cannot be 0 or negative")
    }
    else{
        postData(projectData).then((response) => {
            if (response.status === 200) {
                setProjectData({
                  ...projectData,
                  projectName: "",
                  projectTitle: "",
                  projectDesc: "",
                  priority: 0,
                });
                setTimeout(()=>{
                    setShowData(false);
                },2000)
              }
        })
    }
  };

  return (
    <form
      id="contact"
      className="reveal flex flex-col w-full m-auto lg:w-1/2 2xl:w-1/3"
    >
      <label htmlFor="name" className="text-lg">
        Project Name
      </label>
      <input
        type="text"
        placeholder="name"
        value={projectData.projectName}
        onChange={(e) =>
          setProjectData({ ...projectData, projectName: e.target.value })
        }
        className="h-[40px] mb-3 text-black ps-2"
      ></input>
      <label htmlFor="email" className="text-lg">
        Title
      </label>
      <input
        type="text"
        placeholder="title"
        value={projectData.projectTitle}
        onChange={(e) =>
          setProjectData({ ...projectData, projectTitle: e.target.value })
        }
        className="h-[40px] mb-3 text-black ps-2"
      ></input>
      <label htmlFor="text" className="text-lg">
        Description
      </label>
      <textarea
        placeholder="message.."
        value={projectData.projectDesc}
        onChange={(e) =>
          setProjectData({ ...projectData, projectDesc: e.target.value })
        }
        className="h-[10rem] text-black ps-2"
      ></textarea>
      <label htmlFor="email" className="text-lg">
        Priority
      </label>
      <input
        type="Number"
        placeholder="Priority"
        value={projectData.priority}
        onChange={(e) =>
          setProjectData({ ...projectData, priority: e.target.value })
        }
        className="h-[40px] mb-3 text-black ps-2"
      ></input>
      <button
        type="submit"
        className="mt-6 border-2 w-1/3 m-auto hover:-translate-y-1 hover:scale-110 sm:w-1/5"
        onClick={() => {
          handleSubmit()
        }}
      >
        submit
      </button>
    </form>
  );
};

export default InputForms;
