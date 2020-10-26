import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
    const { projectData , convertDateTime} = props;
    return (
        <div className="project-card">
            <Link to={`/project/${projectData.id}`}>
            <img src={projectData.image} />
            <h3>{projectData.title}</h3>
            <h3>{convertDateTime(projectData.date_created)}</h3>
            </Link>
        </div>
    );
}
export default ProjectCard;