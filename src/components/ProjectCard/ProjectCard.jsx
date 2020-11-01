import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import ProgressBar from "../../components/ProgressBar/ProgressBar"

function ProjectCard(props) {
    const { projectData , convertDateTime} = props;
    return (
        <div className="project-card">
            <Link to={`/project/${projectData.id}`}>
            <img src={projectData.image} />
            <h3>{projectData.title}</h3>
            {/* <h4>{projectData.owner}</h4> */}
            <h4>{convertDateTime(projectData.date_created)}</h4>
            </Link>

        <h4> progress: </h4>
        <div class="progress-container">
            <ProgressBar projectData={projectData}/>
        </div>

        </div>
    );
}
export default ProjectCard;