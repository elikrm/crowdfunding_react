import React from "react";
import { Link } from "react-router-dom";
function Nav() {
return (
<nav className="main-navigation">
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Login"> LogIn</Link></li>
        <li><Link to="/new-project"> NewProject</Link></li>
        <li><Link to="" >LogOut</Link></li>
        <li><Link to="/users"> Register</Link></li>
    </ul>
</nav>
);
}
export default Nav;