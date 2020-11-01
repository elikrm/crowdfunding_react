import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function PledgeForm({ projectId}) {
    // const project_id= Number(projectId);
    const user_id = window.localStorage.getItem("user_id");
    const savedtoken = window.localStorage.getItem("token")
    // console.log(projectId);
    const { id } = useParams();
    const [NewpledgeData,setPledgeList] = useState({
        amount: "",
        comment: "",
        anonymous:false,
        supporter_id: user_id,
        project_id: id
        });
    
    const history = useHistory();


    const handleToggle = (e) => {
        const { id, checked } = e.target
        setPledgeList((newPledge) => ({
          ...newPledge,
          [id]: checked,
        }))
      }

    const handleChange = (e) => {
        const { id, value } = e.target
        setPledgeList((newPledge) => ({
          ...newPledge,
          [id]: value,
        }))
      }

    const postData = async () => {
    const response = await 
    fetch(`${process.env.REACT_APP_API_URL}/pledges/`,
    {
    method: "post",
    headers: {
    "Authorization": `Token ${savedtoken}`,
    "Content-Type": "application/json",
    },
    body: JSON.stringify(NewpledgeData),
    }
    );
    return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (NewpledgeData.amount && NewpledgeData.comment) {
            postData().then((response) => {
        // window.localStorage.setItem("token", response.token);
            console.log(response);
            history.push("/");
        });
        }
        };
    return (
        <form>
            <div class="form-item">
                <label htmlFor="amount">amount:</label>
                <input type="number" id="amount" placeholder="1000" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="comment ">comment:</label>
                <input type="text" id="comment" placeholder="Describe your pledge" onChange={handleChange}/>
            </div>

            <div>
                <input type ="checkbox" id="anonymous"  name="anonymous" value="true" onChange={handleToggle} />
                <label for="anonymous"> Make Annonymous Pledge</label>
            </div>

            <div class="form-item">
                <button type="submit" onClick={handleSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Donate
                </button>
            </div>
        </form>
    );
}
export default PledgeForm;