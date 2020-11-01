import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditProjectForm() {
    
    const[projectDetails,setProjectDetails] = useState({ pledges: [] });
    const history = useHistory();
    const { id } = useParams();

    // const [errorCode, setErrorCode] = useState(200); //this does not work!!
    var globalerror = 200;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((results) => {
            if(results.ok){return results.json();}
            throw Error(results.statusText);
        
        })
        .then((data) => {
            setProjectDetails(data);
        })
        .catch((error) => {
            console.log(error)
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
        })
        .then((response) => {
            console.log(response.status)
            // setErrorCode(response.status); //This one does not work here!!!
            globalerror =(response.status);
            console.log(globalerror);
            return response.json();
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editData()
        .then((response) => {
            if(globalerror===200){
                history.push( `/project/${projectDetails.id}`);
            }
            else{
                console.log(globalerror);
                alert("You do not have permission to edit this project!");
                history.push( "/");
            }
            
        });
    }
    //template
    return ( 
        <form>
        <div class="form-item">
            <label htmlFor="title">Project title:</label>
            <input type="text" id="title" value = {projectDetails.title} maxlength ="400" onChange={handleChange}/>
        </div>

        <div class="form-item">
            <label htmlFor="description ">Project description:</label>
            <textarea type="text" id="description" value = {projectDetails.description} cols="40" rows="10" onChange={handleChange}/>
        </div>

        <div class="form-item">
            <label htmlFor="goal">Project's goal</label>
            <input type ="number" id="goal " value = {projectDetails.goal} onChange={handleChange} />
        </div>

        
        <div class="form-item">
            <label htmlFor="image">Project's image url</label>
            <input type ="url" id="image" value = {projectDetails.image} onChange={handleChange}/>
        </div>
        
        <div class="form-item">
            <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
        
    </form>
      );
}
export default EditProjectForm;