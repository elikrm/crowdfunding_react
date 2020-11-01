
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


function PledgeCard(props) {
    const { pledgeData} = props;
    const [userData, setuserData] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${pledgeData.supporter_id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
            setuserData(data);
        });
        }, []);
    return (
        <div className="project-card">
            <Link to={`/pledges/${pledgeData.id}`}>
            {pledgeData.anonymous ? 
            (<h4>${pledgeData.amount} from {userData.first_name} {userData.last_name}</h4>) : 
            (<h4>${pledgeData.amount} from an anonymous supporter</h4>)
            }
            </Link>
        </div>
    );
}
export default PledgeCard;