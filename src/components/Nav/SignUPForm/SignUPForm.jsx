import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUPForm() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        password: "",
        email:"",
        first_name: "",
        last_name: "",
        image: "",
        bio: "",
        phone: "",
        location: ""
        });
    const history = useHistory();

    const handleSignUp = (e) => {
    const { id, value } = e.target;
    setNewUserData((prevuserData) => ({
    ...prevuserData,
    [id]: value,
    }));
    };
    
        const postuserData = async () => {
        // var savedtoken = window.localStorage.getItem("token");
        const response = await 
        fetch(`${process.env.REACT_APP_API_URL}/users/`,
        {
        method: "post",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
        }
        );
        return response.json();
        };
    
        const handluserSubmit = (e) => {
            e.preventDefault();
            console.log(newUserData);
            postuserData().then((response) => {
            // window.localStorage.setItem("token", response.token);
            console.log(response);
            history.push("/login");
            
            });
            
            };
        return (
            <form>
                <div class="form-item">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" placeholder="Select a username" onChange={handleSignUp}/>
                </div>
    
                <div class="form-item">
                    <label htmlFor="password">Select a password:</label>
                    <input type="password" id="password" placeholder="Enter a password" onChange={handleSignUp}/>
                </div>
                <div class="form-item">
                    <label htmlFor="email">Select your email address:</label>
                    <input type="text" id="email" placeholder="user@gmail.com" onChange={handleSignUp}/>
                </div>
    
                <div class="form-item">
                    <label htmlFor="first_name">What is your firstname?</label>
                    <input type ="text" id="first_name" placeholder="first_name" onChange={handleSignUp} />
                </div>
                <div class="form-item">
                    <label htmlFor="last_name">What is your lastname?</label>
                    <input type ="text" id="last_name" placeholder="last_name" onChange={handleSignUp} />
                </div>

                <div class="form-item">
                    <label htmlFor="image">Enter an image url for this project?</label>
                    <input type ="url" id="image" placeholder="https://via.placeholder.com/300.jpg" onChange={handleSignUp}/>
                </div>

                <div class="form-item">
                    <label htmlFor="bio ">Describe your expertise and career:</label>
                    <textarea type="text" id="bio" cols="40" rows="10" onChange={handleSignUp}/>
                </div>

                <div class="form-item">
                    <label htmlFor="phone">What is your phone number?</label>
                    <input type ="number" id="phone" placeholder="02000412355" onChange={handleSignUp} />
                </div>

                <div class="form-item">
                    <label htmlFor="location">What is your location?</label>
                    <input type ="text" id="location" placeholder="Brisbane" onChange={handleSignUp}/>
                </div>
                <div class="form-item">
                    <button type="submit" onClick={handluserSubmit}>Submit</button>
                </div>
            
            </form>
        );
}
export default SignUPForm;