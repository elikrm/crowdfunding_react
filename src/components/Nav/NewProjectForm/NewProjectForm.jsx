import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewProjectForm() {
    const [NewprojectData, setNewprojectData] = useState({
        title: "",
        description: "",
        goal:0,
        image:"",
        });
    const history = useHistory();

    const handleprojectChange = (e) => {
    const { id, value } = e.target;
    setNewprojectData((prevprojectData) => ({
    ...prevprojectData,
    [id]: value,
    }));
    };

    const postprojectData = async () => {
    var savedtoken = window.localStorage.getItem("token");
    const response = await 
    fetch(`${process.env.REACT_APP_API_URL}/projects/`,
    {
    method: "post",
    headers: {
    "Authorization": `Token ${savedtoken}`,
    "Content-Type": "application/json",
    },
    body: JSON.stringify(NewprojectData),
    }
    );
    return response.text();
    };

    const handleprojectSubmit = (e) => {
        e.preventDefault();
        if (NewprojectData.title && NewprojectData.description && NewprojectData.goal && NewprojectData.image) {
        postprojectData().then((response) => {
        // window.localStorage.setItem("token", response.token);
        history.push("/");
        console.log(response);
        });
        }
        };
    return (
        <form>
            <div class="form-item">
                <label htmlFor="title">Project title:</label>
                <input type="text" id="title" placeholder="Enter Project title" onChange={handleprojectChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="description ">Project description:</label>
                <input type="text" id="description" placeholder="Describe your project" onChange={handleprojectChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="goal">What is the project's goal in number?</label>
                <input type ="number" id="goal" placeholder="200" onChange={handleprojectChange} />
            </div>

            
            <div class="form-item">
                <label htmlFor="image">Enter an image url for this project?</label>
                <input type ="url" id="image" placeholder="https://via.placeholder.com/300.jpg" onChange={handleprojectChange}/>
            </div>

            <div class="form-item">
                <button type="submit" onClick={handleprojectSubmit}>Submit</button>
            </div>
            
        </form>
    );
}
export default NewProjectForm;