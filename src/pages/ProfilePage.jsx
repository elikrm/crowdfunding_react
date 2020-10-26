import React, { useState, useEffect } from "react";
import { allProjects } from "../data";
import UserCard from "../components/UserCard/UserCard";


function ProfilePage() {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setUserList(data);
        });
        }, []);

    return (
        <div id="project-list">
            {userList.map((userData, key) => {
            return <UserCard key={key} userData={userData} />;
            })}
        </div>
    );
}
export default ProfilePage;