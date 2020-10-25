import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditProjectForm() {
    
    const[projectDetails,setProjectDetails] = useState({ pledges: [] });
    const history = useHistory();
    const { id } = useParams();

    // useEffect(() =>{
    //     setProjectDetails({
    //         title: projectDetails.title,
    //         description: projectDetails.description,
    //         goal: projectDetails.goal,
    //         image: projectDetails.image,
    //         is_open: projectDetails.is_open,
    //         owner: projectDetails.owner,
    //     })
    // }
    // ,[projectDetails]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
            setProjectDetails(data);
        });
        }, []);
    //methods
    //set state
    const handleChange = (e)=> {
        const {id, value} = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
            [id]: value,
        }));
    };
    const editData = async() => {
        var savedtoken = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`,{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${savedtoken}`,
            },
            body: JSON.stringify(projectDetails),
        });
        return response.json();
    };

    //get token
    const handleSubmit = (e) => {
        e.preventDefault();
        editData().then(response => {
            console.log(response)
            history.push( `/projects/${response.id}`)
        });
    }
    //template
    return ( 
        <form>
        <div>
            <label htmlFor="title">Project title:</label>
            <input type="text" id="title" value = {projectDetails.title} maxlength ="400" onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="description ">Project description:</label>
            <textarea type="text" id="description" value = {projectDetails.description} cols="40" rows="10" onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="goal">Project's goal</label>
            <input type ="number" id="goal " value = {projectDetails.goal} onChange={handleChange} />
        </div>

        
        <div>
            <label htmlFor="image">Project's image url</label>
            <input type ="url" id="image" value = {projectDetails.image} onChange={handleChange}/>
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
      );
}
export default EditProjectForm;