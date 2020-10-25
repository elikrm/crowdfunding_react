import React, { useState, useEffect } from "react";
// import { oneProject } from "../data";
import { useParams } from "react-router-dom";
import "../components/ProjectCard/ProjectCard.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setProjectData(data);
        });
        }, []);

    
    const deleteData = async() => {
        
        var savedtoken = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`,{
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${savedtoken}`,
            },
            body: JSON.stringify(projectData),
        });
        return response.text();
    };
    const handledelete = (e) => {
        
        e.preventDefault();
        deleteData().then(response => {
            console.log(response)
            history.push( `/`)
        });
    }

return (
    <div className="project-card">
        <h2>{projectData.title}</h2>
        <img src={projectData.image} />
        <h3>Created at: {projectData.date_created}</h3>
        <h4>Description: {projectData.description}</h4>
        <h3>{`Status: ${projectData.is_open}`}</h3>
        <h3>Pledges:</h3>
        <ul>
            {projectData.pledges.map((pledgeData, key) => {
            return (
            <li>
            {pledgeData.amount} from {pledgeData.supporter}
            </li>
            );
            })}
        </ul>

        <nav class="main-navigation">
        <ul>
         
            <li><Link to={`/edit-project/${projectData.id}`}>Edit</Link></li>
            <li><a><button type="submit" onClick={handledelete}>Delete</button></a></li>
        </ul>
        </nav>
    </div>
    );
}
export default ProjectPage;