import React from "react";
import { Link } from "react-router-dom";

function UserCard(props) {
    const { userData} = props;
    return (
        <div className="project-card">
            <Link to={`/users/${userData.id}`}>
            <h3>{userData.first_name} </h3>
            <h3>{userData.last_name} </h3>
            <h3>{userData.email} </h3>
            <img src={userData.image} />
            <h4>{userData.bio}</h4>
            <h3>{userData.phone}</h3>
            <h3>{userData.location}</h3>
            </Link>
        </div>
    );
}
export default UserCard;