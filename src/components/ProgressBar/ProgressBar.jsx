import React, { useState, useEffect } from "react";

function ProgressBar(props) {
    const {projectData} = props;
    // console.log(projectData.id);
    const [progressData, setProgressData] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/progress/${projectData.id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
            setProgressData(data);
        });
        }, []);
        const total = progressData.amount_progress;
        const goal = projectData.goal;
        // console.log(`goal is:${goal}`);
        let percent = Math.floor((total / goal) * 100);
        if (percent > 100) {
            percent = 100
        }
    return(<div class="progress A" style={{width:`${percent}%`}}>{percent}%</div>);
}
export default ProgressBar;