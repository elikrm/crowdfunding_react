import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/ProjectCard/ProjectCard.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PledgePage from "./PledgePage"
import PledgeCard from "../components/PledgeCard/PledgeCard";


function ProjectPage({convertDateTime}) {
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

        if (window.confirm(`You are about to delete the project ${projectData.title}!!!!`)) {
            deleteData().then(response => {
                console.log(response)
                history.push( `/`)
            });
          } 
          else {
            history.push( `/`)
          }
        // deleteData().then(response => {
        //     console.log(response)
        //     history.push( `/`)
        // }
        
    }


return (
    <div className="project-card">
        <h2>{projectData.title}</h2>
        <img src={projectData.image} />
        <h3>This project has beeen created at: {convertDateTime(projectData.date_created)}</h3>
        <h3>Description: </h3>
        <h4>{projectData.description}</h4>
        <h3>goal of this project is {projectData.goal}</h3>
        <h3>Project is {(projectData.is_open)?("Open"):("Closed")}</h3>
        
        

        <hr/>

        <h3>Pledges:</h3>
        <h1>This project has been received</h1>
        <ul>
            {projectData.pledges.map((pledgeData, key) => {
                
            return (
            <li>
                <PledgeCard  pledgeData={pledgeData}/>
            </li>
            );
            })}
        </ul>

        <nav class="main-navigation">
            <ul>
                <li><Link to={`/edit-project/${projectData.id}`}>Edit</Link></li>
                <li><Link type="submit" onClick={handledelete}>Delete</Link></li>
                
            </ul>
        </nav>

        <div>
            <PledgePage projectId={projectData.id}/>
        </div>

        <hr/>


        
    </div>
    );
}
export default ProjectPage;